import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  if (req.path === '/api/authentication' || req.path === '/register') {
    return next();
  }
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ EC: 401, EM: 'Bạn cần đăng nhập trước', DT: '' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu ID người dùng vào req.user để sử dụng ở các bước tiếp theo
    next();
  } catch (error) {
    return res.status(403).json({ EC: 403, EM: 'Token không hợp lệ hoặc đã hết hạn', DT: '' });
  }
};
const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return {
        EC: 1,
        EM: 'Không tìm thấy thông tin user',
        DT: ''
      };
    }
    if (!user.refreshToken.includes(refreshToken)) {
      return {
        EC: 1,
        EM: 'Xác thực không thành công',
        DT: ''
      };
    }
    const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    const newRefreshToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    user.refreshToken = user.refreshToken.filter(token => token !== refreshToken);
    user.refreshToken.push(newRefreshToken);
    await user.save();
    return {
      EC: 0,
      EM: 'Cập nhật token thành công',
      DT: { accessToken, refreshToken: newRefreshToken }
    };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return {
        EC: 1,
        EM: 'Xác thực không thành công. Vui lòng đăng nhập lại',
        DT: ''
      };
    }
    return {
      EC: 500,
      EM: 'Error from server',
      DT: ''
    };
  }
};