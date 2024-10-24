// review.js
const mongoose = require('mongoose');
const reviewSchema = require('../schema/review');  // Import schema từ file review.js

const Review = mongoose.model('Review', reviewSchema);  // Sử dụng schema để tạo model

module.exports = Review;
