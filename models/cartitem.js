const mongoose = require('mongoose');
const cartItemSchema = require('../schema/cartitem');  // Import schema từ file cartitem.js

const CartItem = mongoose.model('CartItem', cartItemSchema);  // Sử dụng schema để tạo model

module.exports = CartItem;
