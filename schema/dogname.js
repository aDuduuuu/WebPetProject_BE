const mongoose = require('../mongoose');

const dogNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = dogNameSchema;
