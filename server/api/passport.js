var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var db = require('../models/db.js');
var occonf = require('../../occonf.json');

module.exports = function(app) {
    var User = db.User;

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    passport.serializeUser(function(user, done) {
        console.log('serializing ', user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        returnURL: 'http://' + occonf.domainName + '/auth/google/return',
        realm: 'http://' + occonf.domainName + '/'
    }, function(identifier, profile, done) {
        User.findOrCreateByOpenId(identifier, profile, function(err, user) {
            done(err, user);
        });
    }));

    app.get('/auth/google', passport.authenticate('google'));
    app.get('/auth/google/return', passport.authenticate('google', { 
        successRedirect: '/',
        failureRedirect: '/signin'
    }));
};
