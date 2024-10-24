const { check } = require('express-validator');

exports.registerValidation = [
  check('email').isEmail().withMessage('Email không hợp lệ'),
  check('firstName').notEmpty().withMessage('Vui lòng nhập họ'),
  check('lastName').notEmpty().withMessage('Vui lòng nhập tên'),
  check('password')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/\d/).withMessage('Mật khẩu phải chứa ít nhất một chữ số'),
  check('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Mật khẩu không trùng khớp')
];
