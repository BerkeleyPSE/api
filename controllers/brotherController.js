const mongoose = require('mongoose');
const h = require('../helpers');
const mongooseStatic = require('../databases/static');
const Brother = mongooseStatic.model('Brother');

exports.getAllBrothers = async (req, res) => {
  const brothersPromise = Brother.find().sort({ name: 1 });
  const countPromise = Brother.count();
  const [brothers, count] = await Promise.all([brothersPromise, countPromise]);
  res.json({ brothers, count });
};

exports.getBrotherByKey = async (req, res) => {
  const brother = await Brother.find({ key: req.params.key });
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.getBrotherById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.filterBrothers = async (req, res) => {
  const { pseClass, year } = req.query;
  let search = {};
  if (h.isValid(pseClass)) search = { ...search, 'pseClass.value': pseClass };
  if (h.isValid(year)) search = { ...search, 'year.value': year };
  const brothers = await Brother.find(search).sort({ name: 1 });
  res.json({ brothers, count: brothers.length });
};
