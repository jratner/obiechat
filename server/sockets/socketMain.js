module.exports = function(io, app) {
    var cookieUtils = require('connect').utils;
    var cookie = require('cookie');
    var messageSockets = require('./messageSockets.js')();
    var topicSockets = require('./topicSockets.js')();
    var userSockets = require('./userSockets.js')(app);
    var occonf = require("../../occonf.json");
    var sessionPrefs = occonf.session;


    io.set('authorization', function(data, accept) {
        if (data.headers.cookie) {
            data.cookie = cookie.parse(data.headers.cookie);
            data.sessionId = cookieUtils.parseSignedCookie(data.cookie[sessionPrefs.key], sessionPrefs.secret);
            if (data.cookie[sessionPrefs.key] == data.sessionId) {
                accept("Invalid cookie", false);
            }
        } else {
            accept("No cookie sent with socket connection", false);
        }
        
        accept(null, true);
    });
    
    io.sockets.on('connection', function(socket) {
        socket.emit('init', {data: 'hello from obiechat!'});

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
