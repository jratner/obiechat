var db = require('../models/db.js');

module.exports = function() {

    var sockets = {};
    
    var startListening = function(socket) {
        
        sockets[socket.id] = socket;
        
        if(socket.handshake.user) {
            socket.user = socket.handshake.user;
            socket.emit('currentUser', {user: socket.user.sanitize()});
        }
    };
    
    var stopListening = function(socket) {
        delete sockets[socket.id];
    };
    
    return {
        startListening: startListening,
        stopListening: stopListening
    };
};

