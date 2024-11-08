// authRoute.js
import { login } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

const initAuthRoute = (app) => {
  // Route for login
  router.post('/authentication', login);

  return app.use('/api', router);
};

export { initAuthRoute as authRoute };
