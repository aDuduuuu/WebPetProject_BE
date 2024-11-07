import mongoose from 'mongoose';
import productSchema from '../schema/product.js';  // Import schema từ file product.js

const Product = mongoose.model('Product', productSchema);  // Sử dụng schema để tạo model

export default Product;
