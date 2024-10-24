const mongoose = require('../mongoose');

const dogSellerSchema = new mongoose.Schema({
  sellerID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  breeds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DogBreed', // Tham chiếu đến bảng DogBreed
    required: true
  }],
  contactInfo: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = dogSellerSchema;