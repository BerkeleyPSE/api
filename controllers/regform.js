const mongoose = require('mongoose');

const h = require('../helpers');
const Regform = mongoose.model('Regform');

exports.getAll = async (req, res) => {
  const regformsPromise = Regform.find({}, 'name _id').sort({ _id: 1 });
  const countPromise = Regform.count();
  const [regforms, count] = await Promise.all([regformsPromise, countPromise]);
  if (h.isNotValid(regforms)) res.sendStatus(404);
  res.render('dataList', { data: regforms, type: 'regforms', count });
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const regform = await Regform.findById(req.params.id);
  if (h.isNotValid(regform)) res.sendStatus(404);
  res.render('dataEdit', { data: regform, type: 'regforms' });
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const regform = await Regform.findByIdAndRemove(req.params.id);
  if (h.isNotValid(regform)) res.sendStatus(404);
  res.redirect('/regforms');
};
