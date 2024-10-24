import mongoose from 'mongoose';
import reviewSchema from '../schema/review.js';  // Import schema từ file review.js

const Review = mongoose.model('Review', reviewSchema);  // Sử dụng schema để tạo model

export default Review;
