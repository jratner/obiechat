module.exports = function(io) {
    io.sockets.on('connection', function(socket) {
        console.log('we have a connection');
        socket.emit('init', {data: 'hello from obiechat!'});

        var messageSockets = require('./messageSockets.js')(socket);
    });
};
