var _ = require('underscore');
var db = require('./server/models/db.js');

var wipe = true, large = true;

var users = [], topics = [], messages = [];
var userCount, topicCount, messagesPerTopic;

if (wipe) {
    wipeDb(function(err) {
        if (err) {
            console.log(err);
            process.exit();
        }
        fillDb(large);
    });
} else {
    fillDb(large);    
}



function fillDb(large) {
    if (large) {
        userCount = 40;
        topicCount = 20;
        messagesPerTopic = 20;
    } else {
        userCount = 20;
        topicCount = 15;
        messagesPerTopic = 5;
    }

    createUsers(function(err) {
        if (err) {
            console.log(err);
            process.exit();
        }
        createTopics(function(err) {
            if(err) {
                console.log(err);
                process.exit();
            }
            createMessages(function(err) {
                if(err) {
                    console.log(err);
                    process.exit();
                }
                console.log('Finished!');
                process.exit();
            });
        });
    });
}

function createUsers(cb) {
    var User = db.User;

    function createUser(cb2) {
        var user = new User({
            firstName: 'first' + randomString(1),
            lastName: 'last' + randomString(1),
            nickName: 'nick' + randomString(1),
            openId: 'google' + randomString(1),
            email: randomString(1) + '@fake.com'
        });
        user.save(function(err, user) {
            if (err) cb2(err);
            console.log('User created: ', user.id, user.displayName);
            users.push({id: user.id, name: user.displayName});
            cb2();
        });
    }
    
    function createUserLoop(err) {
        if (err) return cb(err);
        if (users.length >= userCount) return cb();
        createUser(createUserLoop);
    }
    
    createUserLoop();
}

function createTopics(cb) {
    var Topic = db.Topic;
    var types = {anon: 0, exposed: 0, owned: 0};
    var userIndex = 0;

    function createTopic(type, cb2) {
        var topic = new Topic({
            name: 'Topic ' + randomString(3),
            type: type
        });
        if (type == 'owned') {
            topic.authorId = users[userIndex.id];
            userIndex = (userIndex + 1) % users.length;
        }
        topic.save(function(err, topic) {
            if (err) cb2(err);
            console.log('Topic created: ', topic.id, topic.name);
            topics.push({id: topic.id, name: topic.name});
            types[topic]++;
            cb2();
        });
    }

    function getLeastType() {
        var least;
        var ret;
        _.each(types, function(count, type) {
            if (!least) {
                least = count;
                ret = type;
            }
            if (count < least) {
                ret = type;
            }
        });
        return ret;
    }
    
    function createTopicLoop(err) {
        if (err) return cb(err);
        if (topics.length >= topicCount) return cb();
        createTopic(getLeastType(), createTopicLoop);
    }

    createTopicLoop();
}

function createMessages(cb) {
    
    var Message = db.Message;
    var topicIndex = 0;
    var curtopiccount = 0;
    var userIndex = 0;

    function createMessage(cb2) {
        var message = new Message({
            topicId: topics[topicIndex].id,
            body: 'message ' + randomString(6),
            authorId: users[userIndex].id
        });
        message.save(function(err, message) {
            if (err) cb2(err);
            console.log('Message created: ', message.id, 'topic: ', message.topicId);
            messages.push({id: message.id, topicId: message.topicId});
            userIndex = (userIndex + 1) % users.length;
            curtopiccount++;
            cb2();
        });
    }

    function createMessageLoop(err) {
        if (err) return cb(err);
        if (messages.length >= messagesPerTopic*topics.length) return cb();
        if (curtopiccount > messagesPerTopic) {
            curtopiccount = 0;
            topicIndex = (topicIndex + 1) % topics.length;
        }
        createMessage(createMessageLoop);
    }

    createMessageLoop();
}


function randomString(length) {
    var text = "";

    var words = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
    
    for( var i=0; i < length; i++ ){
        if (i == 0) {
            text += words[Math.floor(Math.random()*100)];
        } else {
            text += ' ' + words[Math.floor(Math.random()*100)];
        }
        
    }

    return text;
}


function wipeDb(cb) {
    var messageTable = function(next) {
        db.Message.drop(function(err) {
            if(err) {
                return next(err);
            }
            console.log("messages dropped");
            db.Message.sync(function(err) {
                if(err) {
                    return next(err);
                }
                console.log("messages synced");
                next();
            });
        });
    };

    var topicTable = function(next) {
        db.Topic.drop(function(err) {
            if(err) {
                return next(err);
            }
            console.log("topics dropped");
            db.Topic.sync(function(err) {
                if(err) {
                    return next(err);
                }
                console.log("topics synced");
                next();
            });
        });
    };
    var userTable = function(next) {
        db.User.drop(function(err) {
            if(err) {
                return next(err);
            }
            console.log('users dropped');
            db.User.sync(function(err) {
                if(err) {
                    return next(err);
                }
                console.log('users synced');
                next();
            });
        });
    };
    
    messageTable(function(err) {
        if (err) {
            cb(err);
        }
        topicTable(function(err) {
            if (err) {
                cb(err);
            }
            userTable(function(err) {
                if (err) {
                    cb(err);
                }
                cb();
            });
        });
    });
}
