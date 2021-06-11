const mongoose = require('./../db.js');
const User = require('./user');
const nestSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  notes: {
    type: [String],
  },
  articles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Article',
  },
});

module.exports = mongoose.model('Nest', nestSchema);
