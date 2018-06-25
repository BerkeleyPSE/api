const cors = require('cors');

module.exports = (req, res, next) => {
  cors();
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
