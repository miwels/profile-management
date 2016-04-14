var express = require('express');
var router = express.Router();

var pagesController = require('../controllers/pagesController.js');
var sessionController = require('../controllers/sessionController.js');

router.get('/login', sessionController.index);
router.post('/login', sessionController.checkLogin);
router.get('/logout', sessionController.destroy);

router.get('/', sessionController.isAuthenticated);

// We could use the isAuthenticated function but instead let's create another
// function to redirect all requests to my index page that contains my Angular
// application.
var checkCredentials = function(req, res, next) {
    if(!req.session.user) {
        req.session.errors = [{message: "You are not logged in!"}];
        res.redirect('/login');
        return;
    }

    res.render('index', { title: 'Express' });
}

// I don't know how to do this. These routes have been defined in my Angular application.
// but I don't want to repeat them here. I should be able to forward every single request
// that hasn't been defined in my /routes folder to the index without having to write them
// one by one in this file.
router.get('/', checkCredentials);
router.get('/profiles', checkCredentials);
router.get('/profile/:username', checkCredentials);
router.get('/profile-add', checkCredentials);
router.get('/profile-add/:username', checkCredentials);
router.get('/picture-add/:username', checkCredentials);

// Match all /profile* routes. We have to do this because Angular 2 uses HTML5
// routes. This means that if a route is defined in Angular but not in our express
// router, the server will fail to resolve the route and it will throw a 404.
// We can solve this by using regular expressions. The following pattern will
// match /profiles, /profile/get/whatever but NOT /api/profiles or /api/profile/get/whatever
// We have another router for API calls

module.exports = router;
