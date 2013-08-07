module.exports = function(io) {
    var postSockets = require('./postSockets.js')();
    var topicSockets = require('./topicSockets.js')();
    var userSockets = require('./userSockets.js')();

    
    io.sockets.on('connection', function(socket) {
        postSockets.startListening(socket);
        topicSockets.startListening(socket);
        userSockets.startListening(socket);

        socket.on('disconnect', function() {
            postSockets.stopListening(this);
            topicSockets.stopListening(this);
            userSockets.stopListening(this);
        });
    });
};
