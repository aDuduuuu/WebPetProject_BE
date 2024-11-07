import { register, verifyEmail, login } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

const initUserRoute = (app) => {
  // Route cho chức năng đăng ký
  router.post('/users', register);

  // Route cho chức năng xác thực email
  router.get('/users/verify-email', verifyEmail);

  // Route cho chức năng đăng nhập
  router.post('/authentication', login);

  // Đưa router vào app với tiền tố '/api'
  return app.use('/api', router);
};

export { initUserRoute as userRoute };
