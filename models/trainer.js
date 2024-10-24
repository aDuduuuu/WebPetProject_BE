// trainer.js
const mongoose = require('mongoose');
const trainerSchema = require('../schema/trainer');  // Import schema từ file trainer.js

const Trainer = mongoose.model('Trainer', trainerSchema);  // Sử dụng schema để tạo model

module.exports = Trainer;
