var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var orm = require("orm");
var port = process.env.PORT || 3000;

io.sockets.on('connection', function(socket) {
    console.log('we have a connection');
    socket.emit('init', {data: 'hello from obiechat!'});
});

var db = require('./server/models/db.js');
