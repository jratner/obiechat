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
    
    User.findByOpenId = function(openId, cb) {
        this.find({openId: openId}, cb);
    };

    return User;
};
