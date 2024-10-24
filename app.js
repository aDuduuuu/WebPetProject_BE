const express = require('express');
const mongoose = require('./mongoose'); // Đảm bảo mongoose được cấu hình đúng
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');  // Import user routes
const userController = require('./controllers/userController');
const { registerValidation } = require('./validators/userValidator');

const app = express();

// Middleware
app.use(bodyParser.json());

// Router cho chức năng đăng ký
app.use('/users', registerValidation, userRouter);  // Định nghĩa route cho người dùng

// Route cho chức năng xác thực email
app.get('/verify-email', userController.verifyEmail);

module.exports = app;
