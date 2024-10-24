import { register, verifyEmail, login } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

// Route cho chức năng đăng ký
router.post('/', register);

// Route cho chức năng xác thực email
router.get('/verify-email', verifyEmail);

// Route cho chức năng đăng nhập
router.post('/authentication', login);

export default router;
