import mongoose from 'mongoose';
import cartItemSchema from '../schema/cartitem.js';  // Import schema từ file cartitem.js

const CartItem = mongoose.model('CartItem', cartItemSchema);  // Sử dụng schema để tạo model

export default CartItem;
