import mongoose from 'mongoose';
import dogNameSchema from '../schema/dogname.js';  // Import schema từ file dogname.js

const DogName = mongoose.model('DogName', dogNameSchema);  // Sử dụng schema để tạo model

export default DogName;
