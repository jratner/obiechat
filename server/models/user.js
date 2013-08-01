var orm = require("orm");
var occonf = require("../../occonf.json");


module.exports = function(db) {
    var User = db.define("user", {
        firstName: String,
        lastName: String,
        nickName: String,
        displayName: String,
        openId: String,
        anonName: String,
        email: String,
	createdDate: Number
    }, {
	methods: {
            sanitize: function() {
                return {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    id: this.id,
                    displayName: this.displayName
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
                firstName: profile.name.familyName,
                lastName: profile.name.givenName,
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

    return User;
};
