const mongoose = require('mongoose');
const h = require('../helpers');
const mongooseStatic = require('../databases/static');
const FulltimeCareer = mongooseStatic.model('FulltimeCareer');

exports.getAllFulltimes = async (req, res) => {
  const fulltimesPromise = FulltimeCareer.find().sort({ name: 1 });
  const countPromise = FulltimeCareer.count();
  const [fulltimeCareers, count] = await Promise.all([
    fulltimesPromise,
    countPromise
  ]);
  res.json({ fulltimeCareers, count });
};

exports.filterFulltimes = async (req, res) => {
  const { pseClass, year } = req.query;
  let search = {};
  if (h.isValid(industry)) search = { ...search, industry };
  const fulltimeCareers = await Brother.find(search).sort({
    name: 1,
    industry: 1
  });
  res.json({ fulltimeCareers, count: fulltimeCareers.length });
};
