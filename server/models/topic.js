var orm = require("orm");

module.exports = function(db) {
    return db.define("topic", {
        name: String,
	createdDate: Date,
        lastPostDate: Date,
        type: String,
	authorId: String
    }, {
	methods: {
            getMessages: function() {
                db.Message.find({topicId: this.id}, ["createdDate", '-1'], function(err, messages) {
                    if (err) {
                        new Error("Couldn't get messages in topic");
                    }
                    return messages;
                });
            }
        }
    }, {
	validations: {
            name: orm.validators.notEmptyString('Topic must have a name')
	}
    }, {
        hooks: {
            beforeCreate: function(next) {
                this.createdDate = Date.now();
                return next();
            }
        }
    });
};
