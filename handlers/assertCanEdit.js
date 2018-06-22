// lodash
const includes = require('lodash/includes');

// local
const { editEmails } = require('./allowedEmails');

module.exports = (req, res, next) =>
  includes(editEmails, req.user.email)
    ? next()
    : res.render('error', {
        status: 401,
        message: 'You are not allowed to make edits.'
      });
