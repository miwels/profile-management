exports.getAll = function(req, res, next) {
    var db = req.db;

    // note: if we don't convert the data to an array using toArray() we will get
    // an error: Converting circular structure to JSON
    db.collection('profiles').find().toArray(function(err, data) {
        res.send(data);
    });
};

// This function is meant to be used to retrieve information of the user who's
// currently logged in so we have to check if the user information he's trying
// to view matches the user information of the logged user
exports.get = function(req, res, next) {
    var username = req.params.username;
    var db = req.db;

    /*
    Uncomment this bit if you want to restrict access to viewing other users
    if(username != req.session.user.username) {
        res.send("error");
    }
    */

    db.collection('profiles').find({username: username}).toArray(function(err, data) {
        res.send(data);
    });
};

// Inserts an entry in the database - profiles collection
exports.insert = function(req, res, next) {
    var db = req.db;
    var username = req.body.username;
    
    // check if the user is trying to insert an existing username
    db.collection('profiles').find({username: username}).toArray(function(err, data) {

            // if it exists, warn the user
            if(data.length !== 0) {
                var output = {
                    status: "ERROR",
                    message: "This username already exists"
                }
                
                res.send(JSON.stringify(output));
            } else{
                
                // if not, insert the data in the database
                var data = {
                    name: req.body.name,
                    username: req.body.username,
                    age: req.body.age,
                    email: req.body.email
                };
                
                db.collection('profiles').insertOne(data, function(err, data) {
                    if(err) throw new Error("Error inserting data in the database");
                    
                    var output = {
                        status: "OK",
                        message: "Profile inserted in the database"
                    };
                    
                    res.send(JSON.stringify(output)); 
                });         
            }
    });
};


// Updates a profile based on the username.
// Right now we only allow to edit the name, age and email
// We should be able to update the city, country, country_code and password in the future
exports.edit = function(req, res, next) {
    var username = req.body.username;  
    var db = req.db;
    
    db.collection('profiles').find({username: username}).toArray(function(err, data) {
        
        var query = {username: username};
        var updateValues = {
            $set: {
                name:   req.body.name,
                age:    req.body.age,
                email:  req.body.email
            }
        };
        
        // if the profile exists in the database, proceed to edit it
        if(data.length != 0) {
            db.collection('profiles').updateOne(query, updateValues, function(err, data) {
                if(err) throw new Error("Error updating profile");
                console.log(data);
                var output = {
                    status: "OK",
                    message: "Profile updated"
                };
                res.send(JSON.stringify(output));
            });
        } 
    });
};

// Deletes a user from the database. First of all we need to check if the user exists. If it does exist then
// we proceed to delete the user from the database.
// We use the username to uniquely identify the user.
exports.delete = function(req, res, next) {
    var username = req.params.username;
    var db = req.db;  
    
    // check if the user exists in the db
    db.collection('profiles').find({username: username}).toArray(function(err, data) {
        // if it exists, delete the user from the database
        if(data.length !== 0) {
            db.collection('profiles').deleteOne({
                username: username
            }, function(err, data) {
                if(err) throw new Error("Unable to delete selected profile");
                
                // if success data will be:
                // { result: { ok: 1, n: 1 }, connection: null, deletedCount: 1 }
                res.send(JSON.stringify(data));       
            });  
        }
    }); 
};
