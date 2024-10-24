const mongoose = require('mongoose');
const cartSchema = require('../schema/cart');  // Import schema từ file cart.js

const Cart = mongoose.model('Cart', cartSchema);  // Sử dụng schema để tạo model

module.exports = Cart;
