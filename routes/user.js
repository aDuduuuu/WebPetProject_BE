const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route cho chức năng đăng ký
router.post('/', userController.register);

// Route cho chức năng xác thực email
router.get('/verify-email', userController.verifyEmail);

module.exports = router;
