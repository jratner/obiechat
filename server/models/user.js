var orm = require("orm");
var occonf = require("../../occonf.json");


module.exports = function(db) {
    var User = db.define("user", {
        firstName: String,
        lastName: String,
        nickName: String,
        openId: String,
        anonName: String,
	createdDate: Date
    }, {
	methods: {
        }
    }, {
	validations: {
            firstName: orm.validators.notEmptyString('User must have a first name'),
            lastName: orm.validators.notEmptyString('User must have a last name'),
            openId: orm.validators.notEmptyString('User must have a google id')
	}
    }, {
        hooks: {
            beforeCreate: function(next) {
                this.createdDate = Date.now();
                return next();
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
                firstname: profile.name.familyName,
                lastname: profile.name.givenName,
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
