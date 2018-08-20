require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Brother = require('../models/Brother');
const Fulltime = require('../models/Fulltime');
const Internship = require('../models/Internship');
const CoffeeChat = require('../models/CoffeeChat');
const Regform = require('../models/Regform');
const Application = require('../models/Application');

const brothers = JSON.parse(
  fs.readFileSync(__dirname + '/brothers.json', 'utf-8')
);
const fulltimes = JSON.parse(
  fs.readFileSync(__dirname + '/fulltimes.json', 'utf-8')
);
const internships = JSON.parse(
  fs.readFileSync(__dirname + '/internships.json', 'utf-8')
);
const coffeeChats = JSON.parse(
  fs.readFileSync(__dirname + '/coffeeChat.json', 'utf-8')
);
const regforms = JSON.parse(
  fs.readFileSync(__dirname + '/regforms.json', 'utf-8')
);
const applications = JSON.parse(
  fs.readFileSync(__dirname + '/applications.json', 'utf-8')
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
    await deleteData('fulltime careers', Fulltime);
    await deleteData('intern careers', Internship);
    await deleteData('coffee chat forms', CoffeeChat);
    await deleteData('registration forms', Regform);
    await deleteData('application forms', Application);
    process.exit();
  } else if (process.argv.includes('--load-all')) {
    await loadData('brothers', brothers, Brother);
    await loadData('fulltime careers', fulltimes, Fulltime);
    await loadData('intern careers', internships, Internship);
    await loadData('coffee chat forms', CoffeeChat);
    await loadData('registration forms', regforms, Regform);
    await loadData('application forms', applications, Application);
    process.exit();
  } else if (process.argv.includes('--brothers')) {
    if (process.argv.includes('--delete'))
      await deleleData('brothers', Brother);
    else await loadData('brothers', brothers, Brother);
  } else if (process.argv.includes('--fulltimes')) {
    if (process.argv.includes('--delete'))
      await deleleData('fulltime careers', Fulltime);
    else await loadData('fulltime careers', fulltimes, Fulltime);
  } else if (process.argv.includes('--intern')) {
    if (process.argv.includes('--delete'))
      await deleteData('intern careers', Internship);
    else await loadData('intern careers', internships, Internship);
  } else if (process.argv.includes('--coffee')) {
    if (process.argv.includes('--delete'))
      await deleteData('coffee chat forms', CoffeeChat);
    else await loadData('coffee chat forms', coffeeChats, CoffeeChat);
  } else if (process.argv.includes('--regforms')) {
    if (process.argv.includes('--delete'))
      await deleteData('registration forms', Regform);
    else await loadData('registration forms', regforms, Regform);
  } else if (process.argv.includes('--applications')) {
    if (process.argv.includes('--delete'))
      await deleteData('application forms', Application);
    else await loadData('application forms', applications, Application);
  } else {
    console.log('invalid arguments');
  }
  process.exit();
})();
