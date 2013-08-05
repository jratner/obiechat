var orm = require("orm");
var occonf = require("../../occonf.json");


module.exports = function(db, Post) {
    var Topic = db.define("topic", {
        name: String,
	createdDate: Number,
        lastPostDate: Date,
        type: String,
	authorId: String
    }, {
	methods: {
            getPosts: function(cb) {
                Post.find({topicId: this.id}, "createdDate", function(err, posts) {
                    cb(err,posts);
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
            if (topics && topics.length) {
                return cb(null, topics[0]);
            }
            return cb(err);
        });
    };

    Topic.getWithPosts = function(id, cb) {
        this.find({id: id}, function(err, topics) {
            if (err) {
                return cb(err);
            }
            if (!(topics && topics.length)) {
                return cb(err);
            }
            var topic = topics[0];
            topic.getPosts(function(err, posts) {
                if (err) {
                    cb(err);
                }
                topic.posts = posts;
                cb(null, topic);
            });
        });
    };

    Topic.getHomePage = function(page, cb) {
        this.page(page).order('lastPostDate').run(function(err, topics) {
            cb(err, topics);
        });
    };
    
    return Topic;
};
