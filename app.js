var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// session variables and body parser
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// MongoDB
var MongoClient = require('mongodb').MongoClient;
var database = "test";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// This middleware allow us to use req.session.variable = "blah"
// Check the documentation here on how to set it up because there are a couple
// of mandatory options
// https://github.com/expressjs/session
app.use(session({
    secret: "lolcatz",
    resave: false,
    saveUninitialized: true
}));
// we cannot use req.session.variable in the views so we have to use an intermediate
// "local" variable to put this data and pass it to the view
// We can access our session variables from the view through the "session" variable
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// initialize our MongoDB client and append it to our req object so that it's available
// in our router:
app.use(function(req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/' + database, function(err, db) {
        if(err) throw err;
        req.db = db;
        next();
    });
});

// app.use(express.static(path.join(__dirname, 'public')));
// This is used for Angular 2. If the /node_modules folder is outside of
// the public folder we have to "map" this folder in our express config
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/app', express.static(__dirname + '/public/app'));

// basic routes
var routes = require('./routes/index');
app.use('/', routes);

// api routes
var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

