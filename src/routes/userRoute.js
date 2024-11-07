import { register, verifyEmail, login, getProfile } from '../controllers/userController.js';
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const initUserRoute = (app) => {
  // Route cho chức năng đăng ký
  router.post('/users', register);

  // Route cho chức năng xác thực email
  router.get('/users/verify-email', verifyEmail);

  // Route để kiểm tra thông tin người dùng
  router.get('/users', authenticateToken, getProfile);

  // Đưa router vào app với tiền tố '/api'
  return app.use('/api/', router);
};

export { initUserRoute as userRoute };
