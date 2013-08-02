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
            firstName: randomString(5),
            lastName: randomString(8),
            nickName: randomString(4),
            openId: randomString(8),
            email: randomString(8)
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
            name: randomString(10),
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
            body: randomString(40),
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

// maybe make this more intelligent (use real words)?
function randomString(length, spaces) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (spaces) {
        possible += '    '; // add a few so spaces are likely
    }

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

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





