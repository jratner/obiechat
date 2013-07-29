var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var orm = require("orm");
var port = process.env.PORT || 3000;
var occonf = require("./occonf.json");

app.configure(function(){
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/public/templates'));
    
    app.use(express.cookieParser());
    var sessionPrefs = occonf.session;
    app.use(express.session({secret: sessionPrefs.secret, key: sessionPrefs.key}));
        
    if (occonf.development) {
        app.use(express.logger());
    }
});


server.listen(port, function() {
    console.log('listening on port', port);
});



var db = require('./server/models/db.js');
var sockets = require('./server/sockets/socketMain.js')(io, app);
