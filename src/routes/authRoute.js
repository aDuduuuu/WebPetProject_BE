// authRoute.js
import { login, register, verifyEmail } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

const initAuthRoute = (app) => {
    // Route for registration
    router.post('/register', register);
    
    // Route for login
    router.post('/authentication', login);

    // Route for email verification
    router.get('/register/verify-email', verifyEmail);

    return app.use('/api', router);
};

export { initAuthRoute as authRoute };
