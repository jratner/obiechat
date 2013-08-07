var _ = require('underscore');
var db = require('./server/models/db.js');

var wipe = true, large = true;

var users = [], topics = [], posts = [];
var userCount, topicCount, postsPerTopic;

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
        postsPerTopic = 20;
    } else {
        userCount = 20;
        topicCount = 15;
        postsPerTopic = 5;
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
            console.log('Finished!');
            process.exit();
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
            users.push({id: user.id, displayName: user.displayName, anonName: user.anonName});
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
    var types = {anon: 0, named: 0, owned: 0};
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
            console.log('Topic created: ', topic.id, topic.name, topic.type);
            topics.push({id: topic.id, name: topic.name});
            types[type]++;
            createPostsForTopic(topic, cb2);
        });
    }

    function getLeastType() {
        var least;
        var ret;
        _.each(types, function(count, type) {
            if (!ret) {
                least = count;
                ret = type;
            }
            if (count < least) {
                ret = type;
                console.log('switching to ', type);
            }
        });
        console.log(ret);
        return ret;
    }
    
    function createTopicLoop(err) {
        if (err) return cb(err);
        if (topics.length >= topicCount) return cb();
        createTopic(getLeastType(), createTopicLoop);
    }

    createTopicLoop();
}

function createPostsForTopic(topic, cb) {
    var Post = db.Post;
    var userIndex = 0;
    var curtopiccount = 0;

    function createPost(cb2) {
        var user = users[userIndex];
        var userName = '';
        if (topic.type == 'owned') {
            if (curtopiccount === 0) {
                userName = user.displayName;
            }
        } else {
            if (topic.type == 'named') {
                userName = user.displayName;
            } else {
                userName = user.anonName;
            }
        }
        var post = new Post({
            topicId: topic.id,
            body: 'post ' + randomString(6),
            authorId: user.id,
            userName: userName
        });
        post.save(function(err, post) {
            if (err) cb2(err);
            console.log('Post created: ', post.id, 'topic: ', post.topicId);
            posts.push({id: post.id, topicId: post.topicId});
            userIndex = (userIndex + 1) % users.length;
            curtopiccount++;
            cb2();
        });
    }
    
    function createPostLoop(err) {
        if (err) return cb(err);
        if (curtopiccount >= postsPerTopic) return cb();
        createPost(createPostLoop);
    }

    createPostLoop();

}

function createPosts(cb) {
    

    var curtopiccount = 0;



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
    var postTable = function(next) {
        db.Post.drop(function(err) {
            if(err) {
                return next(err);
            }
            console.log("posts dropped");
            db.Post.sync(function(err) {
                if(err) {
                    return next(err);
                }
                console.log("posts synced");
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
    
    postTable(function(err) {
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
