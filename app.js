var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var orm = require("orm");
var port = process.env.PORT || 3000;

app.configure(function(){
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/public'));
});


server.listen(port, function() {
    console.log('listening on port', port);
});

app.use(express.logger());

var db = require('./server/models/db.js');
var sockets = require('./server/sockets/socketMain.js')(io);
