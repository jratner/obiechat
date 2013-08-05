var db = require('../models/db.js');

module.exports = function() {
    
    var startListening = function (socket) {
    };
    
    var stopListening = function(socket) {
    };
    
    return {
        startListening: startListening,
        stopListening: stopListening
    };
};
