import mongoose from 'mongoose';

const favoriteItemSchema = new mongoose.Schema({
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
  timestamps: true, // Tự động thêm createdAt và updatedAt
  // Đảm bảo rằng userID và referenceID là duy nhất kết hợp với nhau
  indexes: [
    { 
      fields: { userID: 1, referenceID: 1 },
      options: { unique: true } // Đảm bảo chỉ có một đối tượng yêu thích duy nhất cho mỗi người dùng
    }
  ]
});

export default favoriteItemSchema;
