require('dotenv').config({ path: __dirname + '/../variables.env' });

const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.connect(process.env.MONGO_URI);

const Brother = require('../models/Brother');

async function getKeys() {
  const brotherKeys = await Brother.find({}, 'key').exec();
  return _.map(brotherKeys, 'key');
}

(async () => {
  try {
    const keys = await getKeys();
    _.forEach(keys, async k => {
      await Brother.findOneAndUpdate({ key: k }, { isActive: true }).exec();
    });
  } catch (e) {
    process.exit();
  }
})();
