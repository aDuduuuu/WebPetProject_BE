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
