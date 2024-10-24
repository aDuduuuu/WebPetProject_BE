// favoriteItem.js
const mongoose = require('mongoose');
const favoriteItemSchema = require('../schema/favoriteitem');  // Import schema từ file favoriteitem.js

const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);  // Sử dụng schema để tạo model

module.exports = FavoriteItem;
