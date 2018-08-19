const mongoose = require('mongoose');

const h = require('../helpers');
const CoffeeChat = mongoose.model('CoffeeChat');

const error404 = {
  status: 404,
  message: 'That Coffee Chat was not found.'
};

/*** INTERNAL API ***/

exports.getAll = async (req, res) => {
  const coffeeChatsPromise = CoffeeChat.find({}, 'name _id').sort({ _id: 1 });
  const countPromise = CoffeeChat.count();
  const [coffeeChats, count] = await Promise.all([
    coffeeChatsPromise,
    countPromise
  ]);
  if (h.isNotValid(coffeeChats)) return res.render('error', { ...error404 });
  return res.render('dataList', {
    data: coffeeChats,
    type: 'coffee-chat',
    count
  });
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const coffeeChat = await CoffeeChat.findById(req.params.id);
  if (h.isNotValid(coffeeChat)) return res.render('error', { ...error404 });
  return res.render('dataForm', { data: coffeeChat, type: 'coffee-chat' });
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const coffeeChat = await CoffeeChat.findByIdAndRemove(req.params.id);
  if (h.isNotValid(coffeeChat)) return res.render('error', { ...error404 });
  res.redirect('/coffee-chat');
};

/*** EXTERNAL API ***/

exports.create = async (req, res) => {
  await new CoffeeChat(req.body).save();
  res.sendStatus(201);
};
