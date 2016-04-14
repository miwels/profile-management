var express = require('express');
var router = express.Router();

// ----- start multer setup
var multer = require('multer');
var DIR = './uploads/';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, DIR);
    },
    // rename file with a random sequence of numbers and keep the extension
    filename: function(req, file, cb) {
        var extension = '.undefined';
        switch(file.mimetype) {
            case 'image/jpeg':
                extension = '.jpg';
                break;
        }

        cb(null, Date.now() + extension);
    }
});
var upload = multer({storage: storage, inMemory: false});
// ----- end multer setup

var sessionController = require('../controllers/sessionController');

var profiles = require('../models/profiles');
var countries = require('../models/countries');
var uploads = require('../models/uploads');

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

// NOTE: the name specified in multer.single(<NAME>) or multer.array(<NAME>) must be the same
// we have in our <input name=<NAME>>. Keep in mind that if it's an array we have to specify the
// name in array format too:
// <input name="files[]"> <-> multer.array('files[]')
// upload.array('uploads[]', 12)
router.post('/upload', upload.array('uploads[]', 12), function(req, res){
    res.send(req.files); 
});

module.exports = router;
