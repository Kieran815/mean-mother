var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// import the `users` routes as `apiUsersRouter` variable
var apiUsersRouter = require('./routes/api/users');

var app = express();

/* **** DATABASE CONNECTION **** */
//  config file for mongodb location
var config = require('./config.dev');
// connect app with mongodb
mongoose.connect(config.mongodb, { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session and cookie initialization
app.use(require('express-session')({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    domain: config.cookie.domain,
    // httpOnly: true,
    // secure: true,
    maxAge: 3600000 // 1hr
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// any URL that starts with `/api/users` will look into
// `the /api/users.js` (imported as `apiUsersRouter`)
// file to complete the request.
app.use('/api/users', apiUsersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// then bind that route to a URL endpoint
app.use('/api/users', apiUsersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
