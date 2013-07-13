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


var createTables = function(db) {
    var Message = require("./server/models/message.js")(db);
    Message.drop(function(err) {
        if(err) {
            return console.log("failed to create message table");
        }
        console.log("table backing message model dropped");
        
        Message.sync(function(err) {
            if(err) {
                return console.log("failed to create message table");
            }
            console.log("created table backing message model");
            process.exit();
        });
    });
};

orm.connect(opts, function(err, db) {
    if (err) {
	return new Error('Bad DB Connection');
    }
    createTables(db);
});    
