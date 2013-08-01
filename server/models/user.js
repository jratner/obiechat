var orm = require("orm");
var occonf = require("../../occonf.json");


module.exports = function(db) {
    var User = db.define("user", {
        firstName: String,
        lastName: String,
        nickName: String,
        displayName: String,
        openId: String,
        email: String,
	createdDate: Number
    }, {
	methods: {
            sanitize: function() {
                return {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    id: this.id,
                    displayName: this.displayName,
                    anonName: User.generateAnonName()
                };
            }
        },
	validations: {
            firstName: orm.validators.notEmptyString('User must have a first name'),
            lastName: orm.validators.notEmptyString('User must have a last name'),
            openId: orm.validators.notEmptyString('User must have a google id')
	},
        hooks: {
            beforeCreate: function() {
                console.log('before create');
                this.createdDate = Date.now();
            },
            beforeValidation: function() {
                console.log('before validation');
                this.displayName = this.firstName + " ";
                if (this.nickName) {
                    this.displayName = this.displayName + "'" + this.nickName + "' ";
                }
                this.displayName = this.displayName + this.lastName;
            }
        }
    });

    User.findById = function(id, cb) {
        User.find({id: id}, 1, function(err, user) {
            if(err) {
                return cb(err);
            }
            if(user && user.length) {
                return cb(null, user[0]);
            }
            cb(null);
        });
    };
    
    User.findOrCreateByOpenId = function(openId, profile, cb) {
        User.find({openId: openId}, 1, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (user && user.length) {
                return cb(null, user[0]);
            }
            var userFields = {
                openId: openId,
                lastName: profile.name.familyName,
                firstName: profile.name.givenName,
                email: profile.emails[0].value
            };
            user = User(userFields);
            user.save(function(err, user) {
                if (err) {
                    return cb(err);
                }
                console.log(user);
                cb(null, user);
            });
        });
    };

    var acceptableWords = ['junk', 'cow', 'beer', 'fanatic', 'zealot', 'tree'];
    function genNum(tenpower) {
        return Math.floor(Math.random() * Math.pow(10, tenpower));
    }

    User.generateAnonName = function() {
        var wordex = Math.floor(Math.random()*100) % acceptableWords.length;
        return acceptableWords[wordex] + genNum(4);
    };

    return User;
};
