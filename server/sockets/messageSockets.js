var db = require('../models/db.js');

module.exports = function(socket) {
    socket.on('message:create', function(data) {
        newMessage = db.message(data);
        newMessage.save(function(err, mess) {
            if(err) {
                console.log(err);
            }
        });
    });
};
