module.exports = function(io, app) {
    var messageSockets = require('./messageSockets.js')();
    var topicSockets = require('./topicSockets.js')();
    var userSockets = require('./userSockets.js')(app);
    
    io.sockets.on('connection', function(socket) {
        console.log('we have a connection');
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
