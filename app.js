var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
// Require/Use Passport Local Strategy, defined in user model
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./models/users');
var Articles = require('./models/articles');

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
// import the `users` routes as `apiUsersRouter` variable
var apiUsersRouter = require('./routes/api/users');
var apiArticlesRouter = require('./routes/api/articles');
// import auth routes
var apiAuthRouter = require('./routes/api/auth');


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
// call passport with users strategy
passport.use(Users.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, {
    id: user._id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// expose session data to the views
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});


/* *** SESSION-BASED ACCESS CONTROL *** */
app.use(function(req, res, next) {
  /* *** ALLOW ACCESS TO EVERYTHING *** */
  /* (used heavily in later lessons) */
  // return next();

  // CORS policy to link to ng-cms
  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Credentials', true);
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  //   if ('OPTIONS' == req.method) {
  //     res.send(200);
  //   } else {
  //     next();
  //   }
  // });

  // array of universal access to endpoints
  // (exact matches only)
  var whitelist = [
    '/',
    '/auth',
  ];

  // if requested endpoint is ON the whitelist...
  if(whitelist.indexOf(req.url) !== -1) {
    // allow access
    return next();
  }

  // allow access to dynamic endpoints
  var subs = [
    '/public/',
    '/api/auth/'
  ];

  // allow access to sub-routes (i.e. - `/api/auth/login` or `/api/auth/logout`)
  for (var sub of subs) {
    if(req.url.substring(0, sub.length)===sub) {
      return next();
    }
  }

  // allow user to access ALL ENDPOINTS
  if (req.isAuthenticated()) {
    return next();
  }

  // default: if no other criteria met (no session,
  // no whitelist, etc), redirect to `login` page
  return res.redirect('/auth#login')
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/api/auth', apiAuthRouter);
// any URL that starts with `/api/users` will look into
// `the /api/users.js` (imported as `apiUsersRouter`)
// file to complete the request.
// then bind that route to a URL endpoint
app.use('/api/users', apiUsersRouter);
app.use('/api/articles', apiArticlesRouter);
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
});

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
