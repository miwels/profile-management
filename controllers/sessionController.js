/*
    Renders the main login page
*/
exports.index = function(req, res, next) {
    res.render('login', { title: 'Login with your account'});
}

/*
    Check the login credentials. If the user is found then create the session
    parameters to remember that the user logged in successfully
*/
exports.checkLogin = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var db = req.db;

    var userController = require('./userController');
    userController.authenticate(username, password, db, function(error, user)
    {
        if(error) {
            req.session.errors = [{message: "There was an error: " + error}];
            res.redirect('/login');
            return;
        }

        // if the user is authenticated successfully, save the session details
        req.session.user = {
            id: user.id,
            username: user.username
        };

        console.log(user);

        res.redirect('/');
    });
}

/*
    Destroys the session
*/
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect('/login');
}


/*
    Checks if a user is authenticated
*/
exports.isAuthenticated = function(req, res, next) {
    if(!req.session.user) {
        req.session.errors = [{message: "You are not logged in!"}];
        res.redirect('/login');
        return;
    }
    else {
        next();
    }
}