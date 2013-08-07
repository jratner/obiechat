var orm = require("orm");

module.exports = function(db) {
    return db.define("post", {
	topicId: String,
	body: String,
	createdDate: Number,
	authorId: String
    }, {
	methods: {
        },
	validations: {
            body: orm.validators.notEmptyString('Message must have a body')
	},
        hooks: {
            beforeCreate: function(next) {
                this.createdDate = Date.now();
                return next();
            }
        }
    });
};
