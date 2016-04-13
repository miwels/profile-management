var express = require('express');
var router = express.Router();

// multipart/form-data variables
var multer = require('multer');
var fs = require('fs');
var DIR = '../uploads/';
var upload = multer({dest: DIR});

var sessionController = require('../controllers/sessionController');

var profiles = require('../models/profiles');
var countries = require('../models/countries');
var uploads = require('../models/uploads')

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

// multer allows us to process multipar/form-data forms so that we can upload files using
// inputs of type="file"
// https://github.com/expressjs/multer
router.use(multer({
  dest: DIR,
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
}), uploads.send);

// upload picture:
router.post('/upload', uploads.send);

module.exports = router;
