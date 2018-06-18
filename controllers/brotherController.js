const mongoose = require('mongoose');
const h = require('../helpers');
const mongooseStatic = require('../databases/static');
const Brother = mongooseStatic.model('Brother');

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

exports.getExecutives = async (req, res) => {
  const fields = h.getFields(req);
  const executives = await Brother.find({ isExecutive: true }, fields).exec();
  res.json({ executives, count: executives.length });
};

exports.getBrotherByKey = async (req, res) => {
  const brother = await Brother.find({ key: req.params.key });
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.getBrotherFormById = async (req, res) => {
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.render('brother', { brother });
  // const brotherToSend = { ...brother, ...formatToSend(brother) };
  // res.render('brother', { brother: brotherToSend });
};

exports.getBrotherById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const brother = await Brother.findById(req.params.id);
  if (h.isNotValid(brother)) res.sendStatus(404);
  res.json({ brother });
};

exports.addBrother = (req, res) => res.render('brother');

exports.createBrother = async (req, res) => {
  req.body = { ...req.body, ...formatToSave(req.body) };
  const brother = await new Brother(req.body).save();
  res.redirect(`/brothers/${brother.id}`);
};

exports.updateBrother = async (req, res) => {
  const brother = await Brother.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
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
  const mediaUrls = MEDIA_URLS.filter(m => h.isValidToSave(body[m])).map(m => ({
    media: m,
    href: body[m]
  }));
  return {
    isExecutive,
    majors,
    minors,
    careerInterests,
    previousPositions,
    mediaUrls
  };
};

const formatToSend = brother => {
  const [major1, major2] = [...brother.majors];
  const [minor1, minor2] = [...brother.minors];
  const [careerInterest1, careerInterest2] = [...brother.careerInterests];
  const [previousPosition1, previousPosition2, previousPosition3] = [
    ...brother.previousPositions
  ];
  const mUrls = {};
  brother.mediaUrls.forEach(m => (mUrls[m.media] = m.href));
  return {
    major1,
    major2,
    minor1,
    minor2,
    careerInterest1,
    careerInterest2,
    previousPosition1,
    previousPosition2,
    previousPosition3,
    ...mUrls
  };
};
