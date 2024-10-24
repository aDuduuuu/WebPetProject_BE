// order.js
const mongoose = require('mongoose');
const orderSchema = require('../schema/order');  // Import schema từ file order.js

const Order = mongoose.model('Order', orderSchema);  // Sử dụng schema để tạo model

module.exports = Order;
