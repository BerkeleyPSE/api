// node modules
const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
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

  summerYear: {
    type: Number,
    required: 'You must provide a summer year.',
    min: 2013
  },

  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

InternshipSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Internship', InternshipSchema);
