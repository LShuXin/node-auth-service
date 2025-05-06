const mongoose = require('mongoose');
const { Schema } = mongoose;

const secretCode = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    // seconds
    expires: 600,
  },
});

const Code = mongoose.model('Code', secretCode);

module.exports = Code;