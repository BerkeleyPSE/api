const mongoose = require('mongoose');

const h = require('../helpers');
const Internship = mongoose.model('Internship');

const error400 = {
  status: 400,
  message: 'The provided ID is invalid.'
};

const error404 = {
  status: 404,
  message: 'That Internship was not found.'
};

/*** INTERNAL API ***/

exports.getAllInt = async (req, res) => {
  const fields = 'name _id';
  const internshipsPromise = Internship.find({}, fields).sort({ name: 1 });
  const countPromise = Internship.count();
  const [internships, count] = await Promise.all([
    internshipsPromise,
    countPromise
  ]);
  return res.render('dataList', {
    data: internships,
    type: 'internships',
    count
  });
};

exports.create = async (req, res) => {
  const internship = await new Internship(req.body).save();
  res.redirect(`/internships/view/${internship._id}`);
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.redirect('error', { ...error400 });
  const internship = await Internship.findById(req.params.id);
  if (h.isNotValid(internship)) res.redirect('error', { ...error404 });
  return res.render('dataView', { data: internship, type: 'internships' });
};

exports.update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.redirect('error', { ...error400 });
  const internship = await Internship.findById(req.params.id);
  if (h.isNotValid(internship)) res.redirect('error', { ...error404 });
  return res.render('dataEdit', { data: internship, type: 'internships' });
};

exports.updateById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.redirect('error', { ...error400 });
  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).exec();
  res.redirect(`/internships/view/${internship._id}`);
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.redirect('error', { ...error400 });
  const internship = await Internship.findByIdAndRemove(req.params.id);
  if (h.isNotValid(internship)) res.redirect('error', { ...error404 });
  res.redirect('/internships');
};

/*** EXTERNAL API ***/

exports.getAllExt = async (req, res) => {
  // TODO: add sort functionality
  const internshipsPromise = Internship.find().sort({ name: 1 });
  const countPromise = Internship.count();
  const [internships, count] = await Promise.all([
    internshipsPromise,
    countPromise
  ]);
  res.json({ data: internships, count });
};

exports.filter = async (req, res) => {
  const { industry, company, position, location, summerYear } = req.query;
  let search = {};
  if (h.isValid(industry)) search = { ...search, industry };
  if (h.isValid(company)) search = { ...search, company };
  if (h.isValid(position)) search = { ...search, position };
  if (h.isValid(location)) search = { ...search, location };
  if (h.isValid(summerYear)) search = { ...search, summerYear };
  const internships = await Internship.find(search).sort({ name: 1 });
  res.json({ data: internships, count: internships.length });
};
