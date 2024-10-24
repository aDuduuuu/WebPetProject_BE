// product.js
const mongoose = require('mongoose');
const productSchema = require('../schema/product');  // Import schema từ file product.js

const Product = mongoose.model('Product', productSchema);  // Sử dụng schema để tạo model

module.exports = Product;
