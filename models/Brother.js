const mongoose = require('mongoose');
const dateFns = require('date-fns');
const { Schema } = mongoose;

const mongooseStatic = require('../databases/static');

const BrotherSchema = new Schema(
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

    mediaUrls: [
      {
        media: String,
        href: String
      }
    ]
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

// TODO: add indices???

mongooseStatic.model('Brother', BrotherSchema);
