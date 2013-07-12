var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var orm = require("orm");
var port = process.env.PORT || 3000;


app.get('/', function(req, res, next) {
    res.render('public/index');
});

server.listen(port, function() {
    console.log('listening on port', port);
});

app.use(express.logger());

io.sockets.on('connection', function(socket) {
    console.log('we have a connection');
    socket.emit('init', {data: 'hello from obiechat!'});
});

var db = require('./server/models/db.js');
