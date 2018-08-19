const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const expressValidator = require('express-validator');
const path = require('path');
const cors = require('cors');

// local
const helpers = require('./helpers');
const constants = require('./constants');
const errorHandlers = require('./handlers/errorHandlers');

// routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const brotherRoutes = require('./routes/brother');
const fulltimeRoutes = require('./routes/fulltime');
const internshipRoutes = require('./routes/internship');
const coffeeChatRoutes = require('./routes/coffeeChat');
const regformRoutes = require('./routes/regform');
const applicationRoutes = require('./routes/application');

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

// exposes a bunch of methods for validating data
app.use(expressValidator());

// cookies
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, // cookie is valid for 1 day
    keys: [process.env.COOKIE_KEY]
  })
);

// Passport JS is used to handle logins
require('./handlers/passport');
app.use(passport.initialize());
app.use(passport.session());

// pass variables to templates & all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.co = constants;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// enable CORS for submitting forms from localhost:3000 & www.berkeleypse.org
const corsObj = {
  origin: 'http://localhost:3000',
  methods: 'POST',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

app.options('/coffee-chat/add', cors(corsObj));
app.options('/regforms/add', cors(corsObj));
app.options('/applications/add', cors(corsObj));

// after all middleware, handle own routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/brothers', brotherRoutes);
app.use('/fulltimes', fulltimeRoutes);
app.use('/internships', internshipRoutes);
app.use('/coffee-chat', coffeeChatRoutes);
app.use('/regforms', regformRoutes);
app.use('/applications', applicationRoutes);

// if that doesn't work, send to a 404 page
app.use(errorHandlers.notFound);

// development error handler
if (app.get('env') === 'development') app.use(errorHandlers.developmentErrors);

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
