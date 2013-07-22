var orm = require("orm");


module.exports = function(db) {
    var Topic = db.define("topic", {
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
                        console.log(err);
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
    
    Topic.findById = function(id, cb) {
        this.find({id: id}, cb);
    };
    
    Topic.settings.set("pagination.perpage", occonf.pageSize);
    
    return Topic;
};
