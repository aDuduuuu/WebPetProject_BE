import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (email, firstName, lastName, password, role = 'customer') => {
  try {
    // Kiểm tra xem email đã được đăng ký chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        EC: 400,
        EM: 'Email đã tồn tại',
        DT: ''
      };
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
    const emailResult = await sendVerificationEmail(newUser.email, verificationToken);
    if (emailResult.EC !== 0) {
      return emailResult;
    }

    return {
      EC: 0,
      EM: 'Đăng ký thành công, email xác thực đã được gửi',
      DT: newUser
    };
  } catch (error) {
    console.error('Error during registration:', error);
    return {
      EC: 500,
      EM: 'Lỗi máy chủ trong quá trình đăng ký',
      DT: ''
    };
  }
};

const sendVerificationEmail = async (userEmail, token) => {
  try {
    const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${token}`;

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
    return {
      EC: 0,
      EM: 'Email xác thực đã được gửi',
      DT: ''
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      EC: 500,
      EM: 'Không thể gửi email xác thực',
      DT: ''
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Email không tồn tại:', email);
      return {
        EC: 404,
        EM: 'Sai email hoặc mật khẩu',
        DT: ''
      };
    }
    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.error('Mật khẩu không khớp:', email);
      return {
        EC: 404,
        EM: 'Sai email hoặc mật khẩu',
        DT: ''
      };
    }

    // Kiểm tra xem người dùng đã xác thực email chưa
    if (!user.isVerified) {
      console.error('Tài khoản chưa được xác thực:', email);
      return {
        EC: 403,
        EM: 'Tài khoản chưa được xác thực',
        DT: ''
      };
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Đăng nhập thành công cho người dùng:', email);
    return {
      EC: 0,
      EM: 'Đăng nhập thành công',
      DT: { token, role: user.role }
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      EC: 500,
      EM: 'Lỗi máy chủ trong quá trình đăng nhập',
      DT: ''
    };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return {
        EC: 404,
        EM: 'Người dùng không tồn tại',
        DT: ''
      };
    }

    return {
      EC: 0,
      EM: 'Lấy thông tin người dùng thành công',
      DT: user
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      EC: 500,
      EM: 'Lỗi máy chủ khi lấy thông tin người dùng',
      DT: ''
    };
  }
};

