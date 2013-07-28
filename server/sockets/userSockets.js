var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var db = require('../models/db.js');


module.exports = function(app) {
    var User = db.User;

    passport.use(new GoogleStrategy({
        returnURL: 'http://www.obiechat.com/auth/google/return',
        realm: 'http://www.obiechat.com/'
    }, function(identifier, profile, done) {
        User.findOrCreate({ openId: identifier }, function(err, user) {
            done(err, user);
        });
    }));

    app.get('auth/google', passport.authenticate('google'));
    app.get('auth/google/return', passport.authenticate('google', { 
        successRedirect: '/',
        failureRedirect: '/signin'
    }));
    
    var startListening = function(socket) {
        socket.on('user:create', function(data) {
            newUser = db.User(data);
            newUser.save(function(err, user) {
                if(err) {
                    console.log(err);
                    return socket.emit('error', err);
                }
                socket.emit('user:created', {user: user});
            });
        });
    };
    var stopListening = function(socket) {
    };
    
    return {
        startListening: startListening,
        stopListening: stopListening
    };
};

