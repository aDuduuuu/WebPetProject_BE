import { register, verifyEmail } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

// Route cho chức năng đăng ký
router.post('/', register);

// Route cho chức năng xác thực email
router.get('/verify-email', verifyEmail);

export default router;
