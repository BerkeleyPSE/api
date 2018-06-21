// lodash
const includes = require('lodash/includes');

// local
const { editEmails } = require('./allowedEmails');

module.exports = (req, res, next) =>
  includes(editEmails, req.user.email) ? next() : res.sendStatus(401);
