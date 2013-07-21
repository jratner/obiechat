var db = require('../models/db.js');

module.exports = function() {
    var sockets = {};
    var startListening = function(socket) {
        sockets[socket] = socket;
        socket.on('topic:create', function(data) {
            newTopic = db.Topic(data);
            newTopic.save(function(err, topic) {
                if(err) {
                    console.log(err);
                }
            });
        });
    };

    var stopListening = function(socket) {
        delete sockets.socket;
    };
    
    return {
        sockets: sockets,
        startListening: startListening,
        stopListening: stopListening
    };
};
