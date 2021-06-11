const mongoose = require('./../db.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nest: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Nest',
  },
});

module.exports = mongoose.model('User', userSchema);
