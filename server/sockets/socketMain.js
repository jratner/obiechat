module.exports = function(io, app) {
    var postSockets = require('./postSockets.js')();
    var userSockets = require('./userSockets.js')();

    
    io.sockets.on('connection', function(socket) {
        postSockets.startListening(socket);
        userSockets.startListening(socket);
        app.global.sockets[socket.handshake.user.id] = socket;

        socket.on('disconnect', function() {
            postSockets.stopListening(this);
            userSockets.stopListening(this);
            delete app.global.sockets[socket.handshake.user.id];
        });
    });
};
