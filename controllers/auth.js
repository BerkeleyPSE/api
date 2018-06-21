const passport = require('passport');

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
});

exports.loginCallback = passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/'
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.getSelf = (req, res) => res.json(req.user);
