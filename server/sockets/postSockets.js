var db = require('../models/db.js');

module.exports = function() {
    
    var startListening = function (socket) {
        socket.on('post:create', function(data) {
            newMessage = db.Post(data);
            newMessage.save(function(err, mess) {
                if(err) {
                    console.log(err);
                }
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
