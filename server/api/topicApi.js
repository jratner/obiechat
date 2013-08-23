// topicApi
var db = require('../models/db.js');
var EventEmitter = require('events').EventEmitter;

module.exports = function(app) {
    var Topic = db.Topic;
    var Post = db.Post;
    var self = this;
    this.events = new EventEmitter();

    function watchTopic(topicID, userID) {
        var socket = app.sockets[userID];

        function closeTopic() {
            self.events.removeListener('modifyTopic'+topicID, sendChangedTopic);
        }
        
        function sendChangedTopic() {
            Topic.getWithPosts(topicID, function(err, topic) {
                if (err) {
                    return socket.emit('error', err);
                }
                if (!topic) {
                 return socket.emit('error', new Error('No topic found with id' + topicID));
                }
                socket.emit('modifyTopic'+topicID, {topic: topic});
            });
        }
        
        self.events.on('modifyTopic'+topicID, sendChangedTopic);
        sendChangedTopic();

        socket.on('closeTopic'+topicID, closeTopic);
    }

    app.get('/topic/main', this.viewMainTopic = function(req, res, next) {
        req.data.topicID = Topic.getMainTopicID();
        this.viewTopic(req, res, next);
    });

    app.get('/topic/:id', this.viewTopic = function(req, res, next) {
        var id = req.data.topicID;
        var userID = req.data.userID;
        Topic.getWithPosts(id, function(err, topic) {
            if (err) {
                return next(err);
            }
            if (!topic) {
                return next(new Error('No topic found with id' + id));
            }
            watchTopic(topic.id, userID);
            res.send({data: topic});
        });
    });

    app.post('/topic/post', this.createTopicPost = function(req, res, next) {
        var post = new Post(req.data.post);
        post.save(function(err, post) {
            if (err) {
                return next(err);
            }
            self.events.emit('modifyTopic'+post.topicID);
            res.send({});
        });
    });

    app.post('/topic', this.createTopic = function(req, res, next) {
        var topic = new Topic(req.data.topic);
        topic.save(function(err, topic) {
            if (err) {
                return next(err);
            }
            res.send({topic: topic});
        });
    });
};
