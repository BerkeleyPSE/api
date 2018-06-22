const mongoose = require('mongoose');

const h = require('../helpers');
const Regform = mongoose.model('Regform');

const error404 = {
  status: 404,
  message: 'That Registration Form was not found.'
};

/*** INTERNAL API ***/

exports.getAll = async (req, res) => {
  const regformsPromise = Regform.find({}, 'name _id').sort({ _id: 1 });
  const countPromise = Regform.count();
  const [regforms, count] = await Promise.all([regformsPromise, countPromise]);
  if (h.isNotValid(regforms)) return res.render('error', { ...error404 });
  return res.render('dataList', { data: regforms, type: 'regforms', count });
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const regform = await Regform.findById(req.params.id);
  if (h.isNotValid(regform)) return res.render('error', { ...error404 });
  return res.render('dataEdit', { data: regform, type: 'regforms' });
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const regform = await Regform.findByIdAndRemove(req.params.id);
  if (h.isNotValid(regform)) return res.render('error', { ...error404 });
  res.redirect('/regforms');
};

/*** EXTERNAL API ***/

exports.create = async (req, res) => {
  await new Regform(req.body).save();
  res.sendStatus(201);
};
