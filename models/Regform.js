// node modules
const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const { Schema } = mongoose;

const mongooseApp = require('../databases/application');

const RegformSchema = new Schema({
  name: {
    type: String,
    required: 'You must provide a name.',
    trim: true
  },

  email: {
    type: String,
    required: 'You must provide an email.',
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Email address is invalid.']
  },

  submissionTime: Date
});

RegformSchema.plugin(mongodbErrorHandler);

module.exports = mongooseApp.model('Regform', RegformSchema);
