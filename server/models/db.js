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
    var Message = require("./message.js")(db);
    var Topic = require("./topic.js")(db);
    var User = require("./user.js")(db);
    
    return {
        Message: Message,
        Topic: Topic,
        User: User
    };
})();
