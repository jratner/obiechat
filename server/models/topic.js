var orm = require("orm");

module.exports = function(db) {
    return db.define("topic", {
        name: String,
	createdDate: {type: 'date', defaultValue: Date.now()},
        lastPostDate: {type: 'date', defaultValue: Date.now()},
        type: String,
	authorId: String
    }, {
	methods: {
        }
    }, {
	validations: {
            name: orm.validators.notEmptyString('Topic must have a name')
	}
    });
};
