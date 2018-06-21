// node modules
const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },

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
    unique: true,
    validate: [validator.isEmail, 'Email address is invalid.']
  },

  role: {
    type: String,
    enum: ['editor', 'viewer'],
    required: true,
    default: 'viewer',
    trim: true
  }
});

UserSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', UserSchema);
