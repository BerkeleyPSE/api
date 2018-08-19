const _includes = require('lodash/includes');

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowOrigin(req.get('origin')));
  res.header('Access-Control-Allow-Headers', 'GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

const allowOrigin = origin => {
  if (
    _includes(
      [
        'http://localhost:3000',
        'http://berkeleypse.org',
        'http://www.berkeleypse.org'
      ],
      origin
    )
  ) {
    return origin;
  }
  return null;
};
