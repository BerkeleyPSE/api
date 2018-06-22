const mongoose = require('mongoose');
const h = require('../helpers');
const Brother = mongoose.model('Brother');

const MEDIA_URLS = ['linkedin', 'twitter', 'medium', 'website', 'github'];

const error400 = {
  status: 400,
  message: 'The provided ID is invalid.'
};

const error404 = {
  status: 404,
  message: 'That Brother was not found.'
};

/*** INTERNAL API ***/

exports.getAllInt = async (req, res) => {
  const fields = 'name _id';
  const brothersPromise = Brother.find({}, fields).sort({ name: 1 });
  const countPromise = Brother.count();
  const [brothers, count] = await Promise.all([brothersPromise, countPromise]);
  return res.render('dataList', { data: brothers, type: 'brothers', count });
};

exports.create = async (req, res) => {
  req.body = { ...req.body, ...formatToSave(req.body) };
  const brother = await new Brother(req.body).save();
  res.redirect(`/brothers/view/${brother._id}`);
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.render('error', { ...error400 });
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) return res.render('error', { ...error404 });
  return res.render('dataView', { data: brother, type: 'brothers' });
};

exports.update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.render('error', { ...error400 });
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) return res.render('error', { ...error404 });
  return res.render('dataEdit', { data: brother, type: 'brothers' });
};

exports.updateById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.render('error', { ...error400 });
  req.body = { ...req.body, ...formatToSave(req.body) };
  const brother = await Brother.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.redirect(`/brothers/view/${brother.id}`);
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.render('error', { ...error400 });
  const brother = await Brother.findByIdAndRemove(req.params.id);
  if (h.isNotValid(brother)) return res.render('error', { ...error404 });
  res.redirect('/brothers');
};

/*** EXTERNAL API ***/

exports.getAllExt = async (req, res) => {
  const fields = h.getFields(req);
  const brothersPromise = Brother.find({}, fields).sort({ name: 1 });
  const countPromise = Brother.count();
  const [brothers, count] = await Promise.all([brothersPromise, countPromise]);
  res.json({ data: brothers, count });
};

exports.getExecutives = async (req, res) => {
  const fields = h.getFields(req);
  const executives = await Brother.find({ isExecutive: true }, fields).exec();
  res.json({ data: executives, count: executives.length });
};

exports.getById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ data: brother });
};

exports.getByKey = async (req, res) => {
  const brother = await Brother.findOne({ key: req.params.key });
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ data: brother });
};

exports.filter = async (req, res) => {
  const { pseClass, year } = req.query;
  let search = {};
  if (h.isValid(pseClass)) search = { ...search, pseClass };
  if (h.isValid(year)) search = { ...search, 'year.value': year };
  const brothers = await Brother.find(search).sort({ name: 1 });
  res.json({ data: brothers, count: brothers.length });
};

/*** HELPER FUNCTIONS ***/

const formatToSave = body => {
  const isExecutive = body.isExecutive === 'true' ? true : false;
  const majors = [1, 2].map(m => body[`major${m}`]).filter(h.isValidToSave);
  const minors = [1, 2].map(m => body[`minor${m}`]).filter(h.isValidToSave);
  const careerInterests = [1, 2]
    .map(c => body[`careerInterest${c}`])
    .filter(h.isValidToSave);
  const previousPositions = [1, 2, 3]
    .map(p => body[`previousPosition${p}`])
    .filter(h.isValidToSave);
  const mediaUrls = {};
  MEDIA_URLS.forEach(m => {
    if (h.isValidToSave(body[m])) mediaUrls[m] = body[m];
  });
  return {
    isExecutive,
    majors,
    minors,
    careerInterests,
    previousPositions,
    mediaUrls
  };
};
