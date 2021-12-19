const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: Number,
    required: true,
    min: 10000000,
  },
  savedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  favourite: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

ContactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('contact', ContactSchema);
