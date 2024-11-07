import mongoose from 'mongoose';
import dogSellerSchema from '../schema/dogseller.js';  // Import schema từ file dogseller.js

const DogSeller = mongoose.model('DogSeller', dogSellerSchema);  // Sử dụng schema để tạo model

export default DogSeller;
