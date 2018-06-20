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
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  major: {
    type: String,
    required: true,
    trim: true
  },

  minor: {
    type: String,
    required: true,
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
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  interview1: {
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  interview2: {
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  pmtAvailability: {
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  hear: {
    type: {
      label: String,
      value: String
    },
    required: true,
    trim: true
  },

  additionalInformation: {
    type: String,
    required: true,
    trim: true
  },

  submissionTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
