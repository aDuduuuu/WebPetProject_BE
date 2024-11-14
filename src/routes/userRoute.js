import { getProfile } from '../controllers/userController.js';
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const initUserRoute = (app) => {
  // Route để kiểm tra thông tin người dùng (yêu cầu xác thực token)
  router.get('/users', authenticateToken, getProfile);

  // Đưa router vào app với tiền tố '/api'
  return app.use('/api/', router);
};

export { initUserRoute as userRoute };
