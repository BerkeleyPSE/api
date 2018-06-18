// lodash
const includes = require('lodash/includes');

// local
const { editEmails } = require('./allowed_emails');

module.exports = (req, res, next) =>
  includes(editEmails, req.user.email) ? next() : res.sendStatus(401);
