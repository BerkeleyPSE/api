module.exports = (req, res, next) =>
  req.user
    ? next()
    : res.render('error', {
        status: 401,
        message: 'You must be logged in to do that.'
      });
