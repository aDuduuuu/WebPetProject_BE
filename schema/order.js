const mongoose = require('../mongoose');

const orderSchema = new mongoose.Schema({
  orderID: { type: Number, required: true, unique: true },
  userID: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: { type: String, required: true },
  status: { type: String, required: true },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem'
  }]
});

module.exports = orderSchema;