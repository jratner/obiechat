var db = require('../models/db.js');

module.exports = function() {
    
    var startListening = function(socket) {
        socket.on('user:create', function(data) {
            newUser = db.User(data);
            newUser.save(function(err, user) {
                if(err) {
                    console.log(err);
                    return socket.emit('error', err);
                }
                socket.emit('user:created', {user: user});
            });
        });
    };
    var stopListening = function(socket) {
    };
    
    return {
        startListening: startListening,
        stopListening: stopListening
    };
};

