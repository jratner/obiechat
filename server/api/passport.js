var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var db = require('../models/db.js');
var occonf = require('../../occonf.json');

module.exports = function(app) {
    var User = db.User;

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    var googlePaths = {};

    if (occonf.development) {
        googlePaths.returnURL = 'http://localhost:'+ occonf.port +'/auth/google/return';
        googlePaths.realm = 'http://localhost:' + occonf.port + '/';
    } else {
        googlePaths.returnURL = 'http://' + occonf.domainName + '/auth/google/return';
        googlePaths.realm = 'http://' + occonf.domainName + '/';
    }

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy(googlePaths, function(identifier, profile, done) {
        User.findOrCreateByOpenId(identifier, profile, function(err, user) {
            done(err, user);
        });
    }));

    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/return', passport.authenticate('google', { 
        successRedirect: '/',
        failureRedirect: '/'
    }));
};
