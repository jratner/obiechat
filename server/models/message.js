var orm = require("orm");

module.exports = function(db) {
    return db.define("message", {
	roomId: String,
	body: String,
	createdDate: Date,
	authorId: String,
    }, {
	methods: {
            get: function() {}
	}
    }, {
	validations: {
            body: orm.validators.notEmptyString('Message must have a body')
	}
    });
};
