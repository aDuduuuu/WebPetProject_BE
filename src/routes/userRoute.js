import { register, verifyEmail, login, getProfile } from '../controllers/userController.js';
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const initUserRoute = (app) => {
  router.post('/users', register);
  router.get('/users/verify-email', verifyEmail);

  // Route để kiểm tra thông tin người dùng
  router.get('/users', authenticateToken, getProfile);

  // Đưa router vào app với tiền tố '/api'
  return app.use('/api/', router);
};

export { initUserRoute as userRoute };
