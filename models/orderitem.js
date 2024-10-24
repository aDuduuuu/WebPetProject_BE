// orderItem.js
const mongoose = require('mongoose');
const orderItemSchema = require('../schema/orderitem');  // Import schema từ file orderitem.js

const OrderItem = mongoose.model('OrderItem', orderItemSchema);  // Sử dụng schema để tạo model

module.exports = OrderItem;
