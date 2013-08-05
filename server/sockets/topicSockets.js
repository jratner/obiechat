var db = require('../models/db.js');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

module.exports = function() {
    var Topic = db.Topic;
    var self = this;
    this.events = new EventEmitter();
    
    var stopWatchingTopic = function(watching, topicId) {
        self.events.removeListener('modifyTopic'+ topicId, watching[topicId]);
        delete watching[topicId];
    };

    var stopListening = function(socket) {
        _.each(socket.watching, function(content, id) {
            stopWatchingTopic(socket.watching, id);
        });
        socket.watching = {};
    };
    
    var startListening = function(socket) {
        socket.watching = {};

        socket.on('getAndWatchTopicPosts', function(data) {
            var id = data.topicId;

            function changedTopic() {
                Topic.getWithPosts(id, function(err, topic) {
                     if(err) {
                        console.log(err);
                        return socket.emit('error', err);
                    }
                    if(!topic) {
                        console.log('no topic found');
                        return socket.emit('err', new Error('no topic found with id ' + id));
                    }
                    socket.emit('modifyTopic'+id, {topic: topic});
                });
            }

            changedTopic();
            socket.watching[data.topicId] = changedTopic;
            self.events.on('modifyTopic'+data.topicId, changedTopic);
        });

        socket.on('topic:close', function(data) {
            stopWatchingTopic(socket.watching, data.topicId);
        });

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

    return {
        startListening: startListening,
        stopListening: stopListening
    };
};
