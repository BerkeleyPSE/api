const mongoose = require('mongoose');

const h = require('../helpers');
const Application = mongoose.model('Application');

const error404 = {
  status: 404,
  message: 'That Application was not found.'
};

/*** INTERNAL API ***/

exports.getAll = async (req, res) => {
  const applicationsPromise = Application.find({}, 'name _id').sort({ _id: 1 });
  const countPromise = Application.count();
  const [applications, count] = await Promise.all([
    applicationsPromise,
    countPromise
  ]);
  // TODO: if no applications, redirect but do not send 404
  if (h.isNotValid(applications)) return res.render('error', { ...error404 });
  return res.render('dataList', {
    data: applications,
    type: 'applications',
    count
  });
};

exports.view = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const application = await Application.findById(req.params.id);
  if (h.isNotValid(application)) return res.render('error', { ...error404 });
  return res.render('dataForm', { data: application, type: 'applications' });
};

exports.deleteById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.sendStatus(400);
  const application = await Application.findByIdAndRemove(req.params.id);
  if (h.isNotValid(application)) return res.render('error', { ...error404 });
  res.redirect('/applications');
};

/*** EXTERNAL API ***/

exports.create = async (req, res) => {
  await new Application(req.body).save();
  return res.sendStatus(201);
};
