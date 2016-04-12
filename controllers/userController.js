/*
    This controller allow us to manage all the functions and methods related
    with users.

    It's mainly used in the session controller (sessionController.js) to authenticate
    users that input credentials in the /login page
*/
var crypto = require('crypto');

exports.authenticate = function(user, pass, db, callback) {

    var pass = crypto.createHmac('sha1', pass).update(pass).digest('hex')

    db.collection('profiles').find({
        username: user,
        password: pass
    }).toArray(function(err, data) {

        if(err) callback(new Error("Something bad happened"));

        if(data.length == 0) {
            callback(new Error("User not found")); // user not found
        }
        else {
            callback(null, data[0]); // user found, return control to the next function
        }
    });
}