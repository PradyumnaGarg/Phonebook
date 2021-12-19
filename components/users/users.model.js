const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
});

UserSchema.set('toJSON', {
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', UserSchema);
