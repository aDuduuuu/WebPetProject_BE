import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến bảng User
    required: true
  },
  orderDate: { type: Date, default: Date.now },
  paymentMethod: {
    value: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  shipmentMethod: {
    value: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  orderUser: {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    ward: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  tax: { type: Number },
  status: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem'
  }]
});

export default orderSchema;