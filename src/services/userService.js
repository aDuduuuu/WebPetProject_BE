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
        EM: 'Email already exists!',
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
      EM: 'Registration successful, confirmation email has been sent!',
      DT: newUser
    };
  } catch (error) {
    console.error('Error during registration:', error);
    return {
      EC: 500,
      EM: 'Server error during registration!',
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
      subject: 'Verify your account',
      text: `Click the following link to authenticate your account: ${verificationLink}`
    };

    await transporter.sendMail(mailOptions);
    return {
      EC: 0,
      EM: 'Verification email has been sent',
      DT: ''
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      EC: 500,
      EM: 'Unable to send authentication email',
      DT: ''
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Email does not exist:', email);
      return {
        EC: 404,
        EM: 'Wrong email or password',
        DT: ''
      };
    }
    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.error('Passwords do not match:', email);
      return {
        EC: 404,
        EM: 'Wrong email or password',
        DT: ''
      };
    }

    // Kiểm tra xem người dùng đã xác thực email chưa
    if (!user.isVerified) {
      console.error('Account has not been verified:', email);
      return {
        EC: 403,
        EM: 'Account has not been verified',
        DT: ''
      };
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Successful login for user:', email);
    console.log(token.DT);
    return {
      EC: 0,
      EM: 'Log in successfully',
      DT: { token, role: user.role, id: user._id }
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      EC: 500,
      EM: 'Server error during login process',
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
        EM: 'User does not exist',
        DT: ''
      };
    }

    return {
      EC: 0,
      EM: 'Retrieve user information successfully',
      DT: user
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      EC: 500,
      EM: 'Server error when retrieving user information',
      DT: ''
    };
  }
};

