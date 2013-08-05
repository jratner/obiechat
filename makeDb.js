var db = require('./server/models/db.js');


var postTable = function(next) {
    db.Post.drop(function(err) {
        if(err) {
            return next(err);
        }
        console.log("table backing post model dropped");
        
        db.Post.sync(function(err) {
            if(err) {
                return next(err);
            }
            console.log("created table backing post model");
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
var userTable = function(next) {
    db.User.drop(function(err) {
        if(err) {
            return next(err);
        }
        console.log("table backing user model dropped");
        
        db.User.sync(function(err) {
            if(err) {
                return next(err);
            }
            console.log("created table backing user model");
            next();
        });
    });
};
    
postTable(function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    topicTable(function(err) {
        if (err) {
            console.log(err);
            process.exit();
        }
        userTable(function(err) {
            if (err) {
                console.log(err);
                process.exit();
            }

            console.log("Success!!");
            process.exit();
        });
    });
});
