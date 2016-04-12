var express = require('express');
var router = express.Router();

var sessionController = require('../controllers/sessionController.js');

var profiles = require('../models/profiles.js');
var countries = require('../models/countries.js');

// Authentication middleware. The '*' means that this middleware will be applied
// for any route after the /api/... path
// The "all" method means that it will be applied to all verbs (get, post, put, etc.)
router.all('*', sessionController.isAuthenticated);

// get profiles
router.get('/profile/get', profiles.getAll);
router.get('/profile/get/:username', profiles.get);

// get cities/countries
router.get('/countries', countries.getCountries);
router.get('/cities/:country', countries.getCities);

// new profile
router.post('/profile/post', profiles.insert);

// edit profile
router.put('/profile/post', profiles.edit);

// delete profile
router.delete('/profile/delete/:username', profiles.delete);

module.exports = router;
