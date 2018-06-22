// node modules
const mongoose = require('mongoose');

// TODO: add validators
const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  year: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 5
  },

  major: {
    type: String,
    required: true,
    trim: true
  },

  minor: {
    type: String,
    trim: true
  },

  commitments: {
    type: String,
    required: true,
    trim: true
  },

  freeWeekend: {
    type: String,
    required: true,
    trim: true
  },

  inviteOnly: {
    type: String,
    required: true,
    trim: true
  },

  interview1: {
    type: String,
    required: true,
    trim: true
  },

  interview2: {
    type: String,
    required: true,
    trim: true
  },

  pmtAvailability: {
    type: String,
    required: true,
    trim: true
  },

  hear: {
    type: String,
    required: true,
    trim: true
  },

  addInfo: {
    type: String,
    trim: true
  },

  submissionTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
