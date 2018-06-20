const mongoose = require('mongoose');
const h = require('../helpers');
const Brother = mongoose.model('Brother');

const MEDIA_URLS = ['linkedin', 'twitter', 'medium', 'website', 'github'];

exports.getAllBrothers = async (req, res) => {
  const fields = h.getFields(req);
  const brothersPromise = Brother.find({}, fields).sort({
    name: 1
  });
  const countPromise = Brother.count();
  const [brothers, count] = await Promise.all([brothersPromise, countPromise]);
  res.json({ brothers, count });
};

exports.getBrothers = async (req, res) => {
  // res.json({ it: 'works' });
  const brothersPromise = Brother.find({}, 'name _id');
  const countPromise = Brother.count();
  const [brothers, count] = await Promise.all([brothersPromise, countPromise]);
  res.render('brother', { brothers, count });
};

exports.getExecutives = async (req, res) => {
  const fields = h.getFields(req);
  const executives = await Brother.find({ isExecutive: true }, fields).exec();
  res.json({ executives, count: executives.length });
};

exports.getBrotherByKey = async (req, res) => {
  const brother = await Brother.findOne({ key: req.params.key });
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.updateBrotherById = async (req, res) => {
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.render('brotherEdit', { brother });
};

exports.getBrotherById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.createBrother = async (req, res) => {
  req.body = { ...req.body, ...formatToSave(req.body) };
  const brother = await new Brother(req.body).save();
  res.redirect(`/brothers/view/${brother.id}`);
};

exports.updateBrother = async (req, res) => {
  req.body = { ...req.body, ...formatToSave(req.body) };
  const brother = await Brother.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.redirect(`/brothers/view/${brother.id}`);
};

exports.viewBrother = async (req, res) => {
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.render('dataView', { data: brother, type: 'brothers' });
};

exports.filterBrothers = async (req, res) => {
  const { pseClass, year } = req.query;
  let search = {};
  if (h.isValid(pseClass)) search = { ...search, pseClass };
  if (h.isValid(year)) search = { ...search, 'year.value': year };
  const brothers = await Brother.find(search).sort({ name: 1 });
  res.json({ brothers, count: brothers.length });
};

exports.deleteBrother = async (req, res) => {
  const brother = await Brother.findByIdAndRemove(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.redirect('/brothers');
};

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
