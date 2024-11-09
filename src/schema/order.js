import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến bảng User
    required: true
  },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: { type: String, required: true },
  status: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem'
  }]
});

export default orderSchema;