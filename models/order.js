import mongoose from 'mongoose';
import orderSchema from '../schema/order.js';  // Import schema từ file order.js

const Order = mongoose.model('Order', orderSchema);  // Sử dụng schema để tạo model

export default Order;
