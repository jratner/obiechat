module.exports = function(io) {
    var messageSockets = require('./messageSockets.js')();
    var topicSockets = require('./topicSockets.js')();
    var userSockets = require('./userSockets.js')();

    
    io.sockets.on('connection', function(socket) {
        messageSockets.startListening(socket);
        topicSockets.startListening(socket);
        userSockets.startListening(socket);
        
        socket.on('disconnect', function() {
            messageSockets.stopListening(this);
            topicSockets.stopListening(this);
            userSockets.stopListening(this);
        });
    });
};
