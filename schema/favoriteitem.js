const mongoose = require('../mongoose');

const favoriteItemSchema = new mongoose.Schema({
  itemID: {
    type: Number,
    required: true,
    unique: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến bảng User
    required: true
  },
  type: {
    type: String,
    enum: ['Product', 'DogBreed', 'DogName'], // Giới hạn các giá trị có thể nhận
    required: true
  },
  referenceID: {
    type: mongoose.Schema.Types.ObjectId, // Sử dụng ObjectId để tham chiếu đến bảng tương ứng (Product, DogBreed, DogName)
    required: true
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = favoriteItemSchema;