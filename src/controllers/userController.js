import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { registerUser, loginUser, getUserProfile } from '../services/userService.js';
import { registerValidation, loginValidation } from '../validators/userValidator.js';

export const register = [
  ...registerValidation, // Áp dụng các quy tắc xác thực cho đăng ký
  async (req, res) => {
    // Kiểm tra lỗi từ validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        EC: 400,
        EM: errors.array()[0],
        DT: ''
      });
    }

    try {
      const { email, firstName, lastName, password, role } = req.body;
      const response = await registerUser(email, firstName, lastName, password, role);
      return res.status(response.EC === 0 ? 201 : 400).json({
        EC: response.EC,
        EM: response.EM,
        DT: response.DT
      });
    } catch (error) {
      res.status(500).json({
        EC: 500,
        EM: 'Server error, please try again later.',
        DT: ''
      });
    }
  }
];

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        EC: 400,
        EM: 'The authentication token is invalid or has expired',
        DT: ''
      });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Cập nhật trạng thái xác thực của người dùng
    await User.findByIdAndUpdate(userId, { isVerified: true });

    res.status(200).json({
      EC: 0,
      EM: 'Email authentication successful. Your account has been activated.',
      DT: ''
    });
  } catch (error) {
    res.status(500).json({
      EC: 500,
      EM: 'Email authentication failed',
      DT: ''
    });
  }
};

export const login = [
  ...loginValidation, // Áp dụng các quy tắc xác thực cho đăng nhập
  async (req, res) => {
    // Kiểm tra lỗi từ validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        EC: 400,
        EM: errors.array()[0],
        DT: ''
      });
    }

    try {
      const { email, password } = req.body;
      const response = await loginUser(email, password);

      if (response.EC !== 0) {
        return res.status(400).json({
          EC: response.EC,
          EM: response.EM,
          DT: response.DT
        });
      }

      res.status(200).json({
        EC: 0,
        EM: 'Log in successfully',
        DT: response.DT
      });
    } catch (error) {
      console.error('Login error:', error.message);

      res.status(500).json({
        EC: 500,
        EM: 'Server error, please try again later.',
        DT: ''
      });
    }
  }
];

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await getUserProfile(userId);
    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    res.status(500).json({
      EC: 500,
      EM: 'Server error, please try again later.',
      DT: ''
    });
  }
};
