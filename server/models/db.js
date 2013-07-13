var orm = require("orm");
var opts = {
    database: "obiechat",
    protocol: "mysql",
    host: "localhost",
    user: "obiechatServer",
    password: "obietalk" // teehee
};
var db = orm.connect(opts);

module.exports = function() {
    db.on('connect', function(err, db) {
        if (err) {
            return new Error('Bad DB Connection');
        }
    });
    db.message = require("./message.js")(db);
    return db;
};

