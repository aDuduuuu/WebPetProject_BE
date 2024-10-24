// dogSeller.js
const mongoose = require('mongoose');
const dogSellerSchema = require('../schema/dogseller');  // Import schema từ file dogseller.js

const DogSeller = mongoose.model('DogSeller', dogSellerSchema);  // Sử dụng schema để tạo model

module.exports = DogSeller;
