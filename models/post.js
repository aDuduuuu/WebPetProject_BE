import mongoose from 'mongoose';
import postSchema from '../schema/post.js';  // Import schema từ file post.js

const Post = mongoose.model('Post', postSchema);  // Sử dụng schema để tạo model

export default Post;
