var db = require('../models/db.js');
var events = require('events').EventEmitter;

module.exports = function() {
    var sockets = {};
    var Topic = db.Topic;
    
    var startListening = function(socket) {
        sockets[socket.id] = socket;

        // create a new topic
        socket.on('topic:create', function(data) {
            newTopic = db.Topic(data);
            newTopic.save(function(err, topic) {
                if(err) {
                    console.log(err);
                    socket.emit('error', err);
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
                        socket.emit('error', err);
                    }
                    // stop sockets listening for changes to this topic
                    socket.emit('topic:deleted', {topic: topic});
                });
            });
        });

        // open a topic for a socket
        socket.on('topic:open', function(data) {
            Topic.findById(data.id, function(err, topic) {
                var response = topic;
                if(err) {
                    console.log(err);
                    socket.emit('error', err);
                }
                socket.emit('topic:opened', {topic: topic});
                events.on('topic'+topic.id, changeTopic(socket));
            });
        });

        // close a topic for a socket
        socket.on('topic:close', function(data) {
            // just remove listeners for changes to topic for this socket
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
