// user.js
const mongoose = require('mongoose');
const userSchema = require('../schema/user');  // Import schema từ file user.js

const User = mongoose.model('User', userSchema);  // Sử dụng schema để tạo model

module.exports = User;
