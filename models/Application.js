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
    type: String,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Junior Transfer', 'Senior'],
    required: true,
    trim: true
  },

  gpa: {
    type: String,
    required: true
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

  accomplishment: {
    type: String,
    required: true,
    trim: true
  },
  
  posContribution: {
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
