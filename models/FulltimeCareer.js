// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongooseStatic = require('../databases/static');

const FulltimeCareerSchema = new Schema({
  name: {
    type: String,
    required: 'You must provide a name.',
    trim: true
  },

  industry: {
    type: String,
    required: 'You must provide an industry.',
    trim: true
  },

  company: {
    type: String,
    required: 'You must provide a company.',
    trim: true
  },

  position: {
    type: String,
    required: 'You must provide a position.',
    trim: true
  },

  location: {
    type: String,
    required: 'You must provide a location.',
    trim: true
  },

  gradYear: {
    type: Number,
    required: 'You must provide a graduation year.',
    min: 2013
  }
});

module.exports = mongooseStatic.model('FulltimeCareer', FulltimeCareerSchema);
