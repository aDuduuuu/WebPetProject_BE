import mongoose from 'mongoose';
import trainerSchema from '../schema/trainer.js';  // Import schema từ file trainer.js

const Trainer = mongoose.model('Trainer', trainerSchema);  // Sử dụng schema để tạo model

export default Trainer;
