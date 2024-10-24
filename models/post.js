// post.js
const mongoose = require('mongoose');
const postSchema = require('../schema/post');  // Import schema từ file post.js

const Post = mongoose.model('Post', postSchema);  // Sử dụng schema để tạo model

module.exports = Post;
