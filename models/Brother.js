const mongoose = require('mongoose');
const h = require('../helpers');

const BrotherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'You must provide a name.',
      trim: true
    },

    key: {
      type: String,
      required: 'You must provide a key. (firstname_lastname).',
      lowercase: true,
      trim: true,
      unique: true
    },

    pseClass: {
      type: String,
      required: 'You must provide a PSE Class.'
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4
    },

    isExecutive: {
      type: Boolean,
      default: false,
      required: 'You must specify whether or not this brother is an executive.'
    },

    position: {
      type: String,
      required: 'You must provide a position.',
      default: 'Active'
    },

    hometown: {
      type: String,
      required: 'You must provide a hometown.',
      trim: true
    },

    majors: {
      type: [String],
      required: 'You must provide at least one major.'
    },

    minors: [String],

    careerInterests: {
      type: [String],
      required: 'You must provide at least one career interest.'
    },

    previousPositions: [String],

    bio: {
      type: String,
      required: 'You must provide a biography.',
      trim: true
    },

    mediaUrls: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

BrotherSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual Setters

// Virtual Getters

BrotherSchema.virtual('major1').get(function() {
  return this.majors[0] || '';
});
BrotherSchema.virtual('major2').get(function() {
  return this.majors[1] || '';
});
BrotherSchema.virtual('minor1').get(function() {
  return this.minors[0] || '';
});
BrotherSchema.virtual('minor2').get(function() {
  return this.minors[1] || '';
});
BrotherSchema.virtual('careerInterest1').get(function() {
  return this.careerInterests[0] || '';
});
BrotherSchema.virtual('careerInterest2').get(function() {
  return this.careerInterests[1] || '';
});
BrotherSchema.virtual('previousPosition1').get(function() {
  return this.previousPositions[0] || '';
});
BrotherSchema.virtual('previousPosition2').get(function() {
  return this.previousPositions[1] || '';
});
BrotherSchema.virtual('previousPosition3').get(function() {
  return this.previousPositions[2] || '';
});
BrotherSchema.virtual('linkedin').get(function() {
  return h.getUsername(this.mediaUrls.linkedin) || '';
});
BrotherSchema.virtual('twitter').get(function() {
  return h.getUsername(this.mediaUrls.twitter) || '';
});
BrotherSchema.virtual('medium').get(function() {
  return h.getUsername(this.mediaUrls.medium) || '';
});
BrotherSchema.virtual('website').get(function() {
  return h.getUsername(this.mediaUrls.website) || '';
});
BrotherSchema.virtual('github').get(function() {
  return h.getUsername(this.mediaUrls.github) || '';
});

// TODO: add indices???

module.exports = mongoose.model('Brother', BrotherSchema);
