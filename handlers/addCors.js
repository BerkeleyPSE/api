const cors = require('cors');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') cors();
  next();
};
