// node modules
const mongoose = require('mongoose');

const FulltimeSchema = new mongoose.Schema({
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
  },

  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

FulltimeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Fulltime', FulltimeSchema);
