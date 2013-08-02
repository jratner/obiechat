var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');
var orm = require("orm");
var occonf = require("./occonf.json");
var port = occonf.port || 80;
var passportSocketIo = require("passport.socketio");
var sessionStore = new express.session.MemoryStore();
var cookieParser = require('connect').cookieParser;
var sessionPrefs = occonf.session;


app.configure(function(){
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/public/templates'));
    app.use(express.cookieParser());
    app.use(express.session({store: sessionStore, secret: sessionPrefs.secret, key: sessionPrefs.key}));
        
    if (occonf.development) {
        app.use(express.logger());
    }
});

io.set('authorization', passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: sessionPrefs.key,
    secret: sessionPrefs.secret,
    store: sessionStore,
    fail: function(data, accept) {
        // allow the handshake, currentUser will not be set
        accept(null, true); // second param takes boolean on whether or not to allow handshake
    },
    success: function(data, accept) {
        accept(null, true);
    }
}));



server.listen(port, function() {
    console.log('listening on port', port);
});

var db = require('./server/models/db.js');
var sockets = require('./server/sockets/socketMain.js')(io);
require('./server/api/passport.js')(app);
