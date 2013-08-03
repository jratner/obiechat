var db = require('../models/db.js');
var events = require('events').EventEmitter;

module.exports = function() {
    var sockets = {};
    var Topic = db.Topic;
    
    var startListening = function(socket) {
        sockets[socket.id] = socket;

        socket.on('getAndWatchTopicMessages', function(data) {
            Topic.findById(data.topicId, function(err, topic) {
                // use data.user to check if owned...
                if(err) {
                    console.log(err);
                    return socket.emit('error', err);
                }
                if(!topic) {
                    console.log('no topic found');
                    return socket.emit('err', new Error('no topic found with id ' + data.topicId));
                }
                
                topic.getMessages(function(err, messages) {
                    if(err) {
                        console.log(err);
                        return socket.emit('error', err);
                    }
                    socket.emit('modifyTopic'+topic.id, {topic: topic, messages: messages});
                    //watchTopic(topic.id, socket));
                });
            });
        });

        // create a new topic
        socket.on('topic:create', function(data) {
            newTopic = db.Topic(data);
            newTopic.save(function(err, topic) {
                if(err) {
                    console.log(err);
                    return socket.emit('error', err);
                }
                socket.emit('topic:created', {topic: topic});
            });
        });

        // delete a topic
        socket.on('topic:delete', function(data) {
            Topic.findById(data.id, function(err, topic) {
                if(err) {
                    console.log(err);
                    socket.emit('error', err);
                }
                topic.remove(function(err) {
                    if(err) {
                        console.log(err);
                        return socket.emit('error', err);
                    }
                    // stop sockets listening for changes to this topic
                    socket.emit('topic:deleted', {topic: topic});
                });
            });
        });

        // open a topic for a socket
        socket.on('topic:open', function(data) {
        });

        // close a topic for a socket
        socket.on('topic:close', function(data) {
            // just remove listeners for changes to topic for this socket
        });

        socket.on('topics:getMain', function(data) {
            Topic.getHomePage(data.page, function(err, topics) {
                if(err) {
                    console.log(err);
                    return socket.emit('error', err);
                }
                socket.emit('topics:main', {topics: topics});
            });
        });
    };

    var stopListening = function(socket) {
        // close all node events associated with this socket
        delete sockets[socket.id];
    };
                  
    var changeTopic = function(socket) {
        console.log('changed topic!');
    };

    return {
        sockets: sockets,
        startListening: startListening,
        stopListening: stopListening
    };
};
