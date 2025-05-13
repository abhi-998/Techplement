const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  content: String,
  author: String,
});

module.exports = mongoose.model('Quote', quoteSchema);
