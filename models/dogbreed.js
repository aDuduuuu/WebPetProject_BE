const mongoose = require('mongoose');
const dogBreedSchema = require('../schema/dogbreed');  // Import schema từ file dogbreed.js

const DogBreed = mongoose.model('DogBreed', dogBreedSchema);  // Sử dụng schema để tạo model

module.exports = DogBreed;
