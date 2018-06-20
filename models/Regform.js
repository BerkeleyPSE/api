// node modules
const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const RegformSchema = new mongoose.Schema({
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

  submissionTime: {
    type: Date,
    default: Date.now()
  }
});

RegformSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Regform', RegformSchema);
