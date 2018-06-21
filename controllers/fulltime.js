const mongoose = require('mongoose');
const h = require('../helpers');
const Fulltime = mongoose.model('Fulltime');

/*** INTERNAL API ***/

exports.getAllInt = async (req, res) => {
  const fields = 'name _id';
  const fulltimesPromise = Fulltime.find({}, fields).sort({ name: 1 });
  const countPromise = Fulltime.count();
  const [fulltimes, count] = await Promise.all([
    fulltimesPromise,
    countPromise
  ]);
  res.render('dataList', { data: fulltimes, type: 'fulltimes', count });
};

exports.create = async (req, res) => {
  const fulltime = await new Fulltime(req.body).save();
  res.redirect(`/fulltimes/view/${fulltime._id}`);
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const fulltime = await Fulltime.findById(req.params.id);
  if (h.isNotValid(fulltime)) res.sendStatus(404);
  res.render('dataView', { data: fulltime, type: 'fulltimes' });
};

exports.update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const fulltime = await Fulltime.findById(req.params.id);
  if (h.isNotValid(fulltime)) res.sendStatus(404);
  res.render('dataEdit', { data: fulltime, type: 'fulltimes' });
};

exports.updateById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const fulltime = await Fulltime.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.redirect(`/fulltimes/view/${fulltime._id}`);
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const fulltime = await Fulltime.findByIdAndRemove(req.params.id);
  if (h.isNotValid(fulltime)) res.sendStatus(404);
  res.redirect('/fulltimes');
};

/*** EXTERNAL API ***/

exports.getAllExt = async (req, res) => {
  // TODO: add sort functionality
  const fulltimesPromise = Fulltime.find().sort({ name: 1 });
  const countPromise = Fulltime.count();
  const [fulltimes, count] = await Promise.all([
    fulltimesPromise,
    countPromise
  ]);
  res.json({ data: fulltimes, count });
};

exports.filter = async (req, res) => {
  const { industry, company, position, location, gradYear } = req.query;
  let search = {};
  if (h.isValid(industry)) search = { ...search, industry };
  if (h.isValid(company)) search = { ...search, company };
  if (h.isValid(position)) search = { ...search, position };
  if (h.isValid(location)) search = { ...search, location };
  if (h.isValid(gradYear)) search = { ...search, gradYear };
  const fulltimes = await Fulltime.find(search).sort({ name: 1 });
  res.json({ data: fulltimes, count: fulltimes.length });
};
