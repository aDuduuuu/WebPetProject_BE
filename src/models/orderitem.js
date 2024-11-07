import mongoose from 'mongoose';
import orderItemSchema from '../schema/orderitem.js';  // Import schema từ file orderitem.js

const OrderItem = mongoose.model('OrderItem', orderItemSchema);  // Sử dụng schema để tạo model

export default OrderItem;
