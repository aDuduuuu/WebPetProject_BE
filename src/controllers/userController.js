import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { registerUser, loginUser } from '../services/userService.js';
import { registerValidation, loginValidation } from '../validators/userValidator.js';

export const register = [
  ...registerValidation, // Áp dụng các quy tắc xác thực cho đăng ký
  async (req, res) => {
    // Kiểm tra lỗi từ validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        EC: 400,
        EM: 'Dữ liệu không hợp lệ',
        DT: errors.array()
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
        EM: 'Lỗi máy chủ, vui lòng thử lại sau.',
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
        EM: 'Token xác thực không hợp lệ hoặc đã hết hạn',
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
      EM: 'Xác thực email thành công. Tài khoản của bạn đã được kích hoạt.',
      DT: ''
    });
  } catch (error) {
    res.status(500).json({
      EC: 500,
      EM: 'Xác thực email không thành công',
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
        EM: 'Dữ liệu không hợp lệ',
        DT: errors.array()
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
        EM: 'Đăng nhập thành công',
        DT: response.DT
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error.message);

      res.status(500).json({
        EC: 500,
        EM: 'Lỗi máy chủ, vui lòng thử lại sau.',
        DT: ''
      });
    }
  }
];
