const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');

const path = require('path');

// local
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves up static files from the public folder. anything in public/ will be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// takes raw requests; turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// exposes a bunch of methods for validating data // TODO: do i need this?
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport JS is used to handle logins
// app.use(passport.initialize());
// app.use(passport.session());

// pass variables to templates & all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  // req.login = promisify(req.login, req);
  next();
});

// after all middleware, handle own routes
app.use('/', routes);

// if that doesn't work, send to a 404 page
app.use(errorHandlers.notFound);

// development error handler
if (app.get('env') === 'development') app.use(errorHandlers.developmentErrors);

// production error handler
app.use(errorHandlers.productionErrors);

// done! export the app!
module.exports = app;
