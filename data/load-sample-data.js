require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Brother = require('../models/Brother');
const FulltimeCareer = require('../models/FulltimeCareer');
const InternCareer = require('../models/InternCareer');
const Regform = require('../models/Regform');
// const Application = require('../models/Application');

const brothers = JSON.parse(
  fs.readFileSync(__dirname + '/brothers.json', 'utf-8')
);
const fulltimeCareers = JSON.parse(
  fs.readFileSync(__dirname + '/fulltimeCareers.json', 'utf-8')
);
const internCareers = JSON.parse(
  fs.readFileSync(__dirname + '/internCareers.json', 'utf-8')
);
const regforms = JSON.parse(
  fs.readFileSync(__dirname + '/regforms.json', 'utf-8')
);

async function deleteData(name, model) {
  await model.remove();
  console.log(`successfully deleted data for: ${name}`);
}

async function loadData(name, data, model) {
  console.log(`loading data: ${name}`);
  try {
    await model.insertMany(data);
  } catch (e) {
    console.log(`error in loading data: ${name}`, e);
    process.exit();
  }
  console.log(`successfully loaded data for: ${name}`);
}

(async function() {
  if (process.argv.includes('--delete-all')) {
    await deleteData('brothers', Brother);
    await deleteData('fulltime careers', FulltimeCareer);
    await deleteData('intern careers', InternCareer);
    await deleteData('registration forms', Regform);
    process.exit();
  } else if (process.argv.includes('--load-all')) {
    await loadData('brothers', brothers, Brother);
    await loadData('fulltime careers', fulltimeCareers, FulltimeCareer);
    await loadData('intern careers', internCareers, InternCareer);
    await loadData('registration forms', regforms, Regform);
    process.exit();
  } else if (process.argv.includes('--brothers')) {
    if (process.argv.includes('--delete'))
      await deleleData('brothers', Brother);
    else await loadData('brothers', brothers, Brother);
  } else if (process.argv.includes('--fulltime')) {
    if (process.argv.includes('--delete'))
      await deleleData('fulltime careers', FulltimeCareer);
    else await loadData('fulltime careers', fulltimeCareers, FulltimeCareer);
  } else if (process.argv.includes('--intern')) {
    if (process.argv.includes('--delete'))
      await deleteData('intern careers', InternCareer);
    else await loadData('intern careers', internCareers, InternCareer);
  } else if (process.argv.includes('--regforms')) {
    if (process.argv.includes('--delete'))
      await deleteData('registration forms', Regform);
    else await loadData('registration forms', regforms, Regform);
  } else if (process.argv.includes('--applications')) {
    console.log('not yet implemented');
  } else {
    console.log('invalid arguments');
  }
  process.exit();
})();
