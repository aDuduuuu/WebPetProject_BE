// spa.js
const mongoose = require('mongoose');
const spaSchema = require('../schema/spa');  // Import schema từ file spa.js

const Spa = mongoose.model('Spa', spaSchema);  // Sử dụng schema để tạo model

module.exports = Spa;
