import express from 'express';
import mongoose from './mongoose.js'; // Đảm bảo mongoose được cấu hình đúng
import bodyParser from 'body-parser';
import userRouter from './routes/user.js'; // Import user routes
import { verifyEmail } from './controllers/userController.js';
import { registerValidation } from './validators/userValidator.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Router cho chức năng đăng ký
app.use('/users', registerValidation, userRouter); // Định nghĩa route cho người dùng

// Route cho chức năng xác thực email
app.get('/verify-email', verifyEmail);

export default app;
