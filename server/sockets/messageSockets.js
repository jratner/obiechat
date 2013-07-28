var db = require('../models/db.js');

module.exports = function() {
    var sockets = {};
    
    var startListening = function (socket) {
        sockets[socket] = socket;
        socket.on('message:create', function(data) {
            newMessage = db.Message(data);
            newMessage.save(function(err, mess) {
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
