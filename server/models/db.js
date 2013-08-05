var orm = require("orm");
var paging = require("orm-paging");

var opts = {
    database: "obiechat",
    protocol: "mysql",
    host: "localhost",
    user: "obiechatServer",
    password: "obietalk" // teehee
};
var db = orm.connect(opts);

module.exports = (function() {
    db.on('connect', function(err, db) {
        if (err) {
            return new Error('Bad DB Connection');
        }
    });

    db.use(paging);
    var Post = require("./post.js")(db);
    var Topic = require("./topic.js")(db, Post);
    var User = require("./user.js")(db);
    
    return {
        Post: Post,
        Topic: Topic,
        User: User
    };
})();
