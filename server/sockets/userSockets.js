var db = require('../models/db.js');

module.exports = function() {

    var startListening = function(socket) {
        if(socket.handshake.user) {
            socket.user = socket.handshake.user;
            socket.emit('currentUser', {user: socket.user.sanitize()});
        }
    };
    
    var stopListening = function(socket) {
    };
    
    return {
        startListening: startListening,
        stopListening: stopListening
    };
};

