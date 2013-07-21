var _ = require('underscore');
var db = require('./server/models/db.js');
var done = 0;

var messageTable = function(next) {
    db.Message.drop(function(err) {
        if(err) {
            return next(err);
        }
        console.log("table backing message model dropped");
        
        db.Message.sync(function(err) {
            if(err) {
                return next(err);
            }
            console.log("created table backing message model");
            next();
        });
    });
};

var topicTable = function(next) {
    db.Topic.drop(function(err) {
        if(err) {
            return next(err);
        }
        console.log("table backing topic model dropped");
        
        db.Topic.sync(function(err) {
            if(err) {
                return next(err);
            }
            console.log("created table backing topic model");
            next();
        });
    });
};
    
messageTable(function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    topicTable(function(err) {
        if (err) {
            console.log(err);
            process.exit();
        }
        console.log("Success!!");
        process.exit();
    });
});
