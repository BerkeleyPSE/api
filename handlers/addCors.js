const cors = require('cors');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    cors();
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
};
