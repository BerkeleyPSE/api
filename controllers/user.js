const mongoose = require('mongoose');

const h = require('../helpers');

const User = mongoose.model('User');

exports.get = async (req, res) => {
  const usersPromise = User.find({}).sort({ name: 1 });
  const countPromise = User.count();
  const [users, count] = await Promise.all([usersPromise, countPromise]);
  if (h.isNotValid(users)) res.sendStatus(404);
  res.render('dataList', { data: users, type: 'users', count });
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const user = await User.findById(req.params.id);
  if (h.isNotValid(user)) res.sendStatus(404);
  res.render('dataEdit', { data: user, type: 'users' });
};
