const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  number: {
    type: Number,
    required: true,
    min: 10000000,
  },
});

PersonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('person', PersonSchema);
