var orm = require("orm");
var occonf = require("../../occonf.json");


module.exports = function(db, Message) {
    var Topic = db.define("topic", {
        name: String,
	createdDate: Number,
        lastPostDate: Date,
        type: String,
	authorId: String
    }, {
	methods: {
            getMessages: function(cb) {
                Message.find({topicId: this.id}, "createdDate", function(err, messages) {
                    cb(err,messages);
                });
            }
        },
	validations: {
            name: orm.validators.notEmptyString('Topic must have a name')
	},
        hooks: {
            beforeCreate: function(next) {
                this.createdDate = Date.now();
                return next();
            }
        }
    });
    
    Topic.settings.set("pagination.perpage", occonf.pageSize);
    
    Topic.findById = function(id, cb) {
        this.find({id: id}, function(err, topics) {
            if (topics && topics[0]) {
                return cb(null, topics[0]);
            }
            return cb(err);
        });
        
    };

    Topic.getHomePage = function(page, cb) {
        this.page(page).order('lastPostDate').run(function(err, topics) {
            cb(err, topics);
        });
    };
    
    return Topic;
};
