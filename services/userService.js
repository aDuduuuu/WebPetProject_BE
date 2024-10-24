const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Hàm đăng ký người dùng
exports.registerUser = async (email, firstName, lastName, password, role = 'customer') => {
  // Kiểm tra xem email đã được đăng ký chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã tồn tại');
  }

  // Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Tạo người dùng mới (chưa xác thực)
  const newUser = new User({
    email,
    firstName,
    lastName,
    passwordHash,
    role,
    isVerified: false // Thêm trường này để đánh dấu người dùng chưa xác thực
  });

  // Lưu người dùng vào cơ sở dữ liệu
  await newUser.save();

  // Tạo token xác thực email
  const verificationToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Gửi email xác thực
  await sendVerificationEmail(newUser.email, verificationToken);

  return newUser;
};

// Hàm gửi email xác thực (cần cấu hình thực tế)
const sendVerificationEmail = async (userEmail, token) => {
  const verificationLink = `${process.env.BASE_URL}/users/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Xác thực tài khoản của bạn',
    text: `Nhấp vào liên kết sau để xác thực tài khoản của bạn: ${verificationLink}`
  };

  await transporter.sendMail(mailOptions);
};
