var orm = require("orm");

module.exports = function(db) {
    return db.define("message", {
	topicId: String,
	body: String,
	createdDate: {type: 'date', defaultValue: Date.now()},
	authorId: String
    }, {
	methods: {
        }
    }, {
	validations: {
            body: orm.validators.notEmptyString('Message must have a body')
	}
    });
};
