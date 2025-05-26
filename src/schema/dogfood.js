import mongoose from 'mongoose';

const dogFoodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Tên món ăn
  isSafe: { type: Boolean, required: true }, // Có an toàn không?
  effects: { type: String, required: true }, // Tác dụng hoặc tác hại
  category: { type: String }, // Loại (ví dụ: rau, thịt, trái cây...)
  note: { type: String }, // Ghi chú thêm
  image: { type: String }, // URL hình ảnh minh họa
  createdAt: { type: Date, default: Date.now } // Ngày tạo
});

export default dogFoodSchema;
