// require('dotenv').config({ path: __dirname + '../variables.env' });
const fs = require('fs');
// const path = require('path');

require('../databases/static');
// require('../databases/application');

const Brother = require('../models/Brother');
// const FulltimeCareer = require('../models/FulltimeCareer');
// const InternCareer = require('../models/InternCareer');
// const Regform = require('../models/Regform');
// const Application = require('../models/Application');

const brothers = JSON.parse(
  fs.readFileSync(__dirname + '/brothers.json', 'utf-8')
);

async function deleteData() {
  await Brother.remove();
  // await FulltimeCareer.remove();
  // await InternCareer.remove();
  // await Regform.remove();
  // await Application.remove();
  console.log('~~~ data deleted successfully ~~~');
  process.exit();
}

async function loadData() {
  console.log('attempting to load data');
  try {
    await Brother.insertMany(brothers);
    // await FulltimeCareer.insertMany(brothers);
    // await InternCareer.insertMany(brothers);
    // await Regform.insertMany(brothers);
    // await Application.insertMany(brothers);
    console.log('~~~ data loaded successfully ~~~');
    process.exit();
  } catch (e) {
    console.log('~~~ error in loading data ~~~');
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
