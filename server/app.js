// the heart of the server
var orm = require("orm");


// load up the db!
var opts = {
    database: "obiechat",
    protocol: "mysql",
    host: "localhost",
    user: "obiechatServer",
    password: "obietalk" // teehee
};

orm.connect(opts, function(err, db) {
    if (err) {
	return new Error('Bad DB Connection');
    }
    
    var Message = require("./models/message.js")(db);
});

