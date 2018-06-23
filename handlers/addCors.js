module.exports = (req, res, next) => {
  // if (process.env.NODE_ENV === 'development') cors();
  if (process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  next();
};
