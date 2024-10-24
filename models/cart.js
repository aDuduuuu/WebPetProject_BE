import mongoose from 'mongoose';
import cartSchema from '../schema/cart.js';  // Import schema từ file cart.js

const Cart = mongoose.model('Cart', cartSchema);  // Sử dụng schema để tạo model

export default Cart;
