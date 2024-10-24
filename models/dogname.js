// dogName.js
const mongoose = require('mongoose');
const dogNameSchema = require('../schema/dogname');  // Import schema từ file dogname.js

const DogName = mongoose.model('DogName', dogNameSchema);  // Sử dụng schema để tạo model

module.exports = DogName;
