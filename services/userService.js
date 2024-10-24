import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (email, firstName, lastName, password, role = 'customer') => {
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

export const loginUser = async (email, password) => {
  // Tìm người dùng theo email
  const user = await User.findOne({ email });
  if (!user) {
    console.error('Email không tồn tại:', email);
    throw new Error('Sai email hoặc mật khẩu');
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    console.error('Mật khẩu không khớp:', email);
    throw new Error('Sai email hoặc mật khẩu');
  }

  // Kiểm tra xem người dùng đã xác thực email chưa
  if (!user.isVerified) {
    console.error('Tài khoản chưa được xác thực:', email);
    throw new Error('Tài khoản chưa được xác thực');
  }

  // Tạo JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('Đăng nhập thành công cho người dùng:', email);
  return token;
};
