const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const CoffeeChatSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, 'Email address is invalid.']
  },

  availability1: {
    type: String,
    required: true
  },

  availability2: {
    type: String,
    required: false
  },

  availability3: {
    type: String,
    required: false
  },

  brotherPreferences: {
    type: String,
    trim: true
  },

  aboutYou: {
    type: String
  },

  submissionTime: {
    type: Date,
    default: Date.now()
  }
});

CoffeeChatSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('CoffeeChat', CoffeeChatSchema);
