const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongooseStatic = require('../databases/static');

const BrotherSchema = new Schema({
  key: {
    type: String,
    required: 'You must provide a key. (firstname_lastname).',
    lowercase: true,
    trim: true
  },

  name: {
    type: String,
    required: 'You must provide a name.',
    trim: true
  },

  pseClass: {
    type: {
      label: String,
      value: String
    },
    required: 'You must provide a PSE Class.'
  },

  year: {
    type: {
      label: String,
      value: String
    },
    required: 'You must provide a year.'
  },

  isExecutive: {
    type: {
      label: String,
      value: Boolean
    },
    required: 'You must specify whether or not this brother is an executive.',
    default: false
  },

  position: {
    type: {
      label: String,
      value: String
    },
    required: 'You must provide a position.',
    default: 'Active'
  },

  hometown: {
    type: String,
    required: 'You must provide a hometown.',
    trim: true
  },

  majors: [
    {
      label: String,
      value: String
    }
  ],

  minors: [
    {
      label: String,
      value: String
    }
  ],

  careerInterests: [
    {
      label: String,
      value: String
    }
  ],

  previousPositions: [
    {
      label: String,
      value: String
    }
  ],

  bio: {
    type: String,
    required: 'You must provide a biography.',
    trim: true
  },

  mediaUrls: [
    {
      label: String,
      key: String,
      value: String
    }
  ]
});

mongooseStatic.model('Brother', BrotherSchema);
