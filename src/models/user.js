import mongoose from 'mongoose';
import userSchema from '../schema/user.js';  // Import schema từ file user.js

const User = mongoose.model('User', userSchema);  // Sử dụng schema để tạo model

export default User;
