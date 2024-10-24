const mongoose = require('../mongoose');

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: Number,
    required: true,
    unique: true
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Tham chiếu đến bảng Product
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến bảng User
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = reviewSchema;