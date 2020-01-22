// node modules
require('dotenv').config({ path: __dirname + '/../variables.env' });
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const includes = require('lodash/includes');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// local
const User = mongoose.model('User');
const { allEmails, editEmails } = require('./allowedEmails');
const h = require('../helpers');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
      // proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (h.isValid(existingUser)) return done(null, existingUser);

      const email = profile.emails[0].value;
      if (!includes(allEmails, email)) return done(null, null);

      let role = 'viewer';
      if (includes(editEmails, email)) role = 'editor';

      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email,
        role
      }).save();

      done(null, user);
    }
  )
);
