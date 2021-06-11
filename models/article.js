const mongoose = require('./../db.js');
const articleSchema = new mongoose.Schema({
  newsArticle: {
    type: String,
    required: true,
  },
  notes: {
    type: [String],
  },
});

module.exports = mongoose.model('Article', articleSchema);
