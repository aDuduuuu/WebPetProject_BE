const mongoose = require('../mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productCode: { type: String, unique: true },
  image: { type: String },
  productType: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = productSchema;