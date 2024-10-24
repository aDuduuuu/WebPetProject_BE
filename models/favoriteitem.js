import mongoose from 'mongoose';
import favoriteItemSchema from '../schema/favoriteitem.js';  // Import schema từ file favoriteitem.js

const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);  // Sử dụng schema để tạo model

export default FavoriteItem;
