import express from 'express';
import connectDB from './mongoose.js'; // Sử dụng connectDB từ mongoose.js
import bodyParser from 'body-parser';
import { userRoute } from './routes/userRoute.js'; // Import userRoute để sử dụng initUserRoute
import { spaRoute } from './routes/spaRoute.js'; // Import spaRoute để sử dụng initSpaRoute
import { trainerRoute } from './routes/trainerRoute.js'; // Import trainerRoute để sử dụng initTrainerRoute
import dotenv from 'dotenv';

dotenv.config();

// Kết nối đến MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Middleware để cho phép sử dụng JSON trong req.body

// Khởi tạo các route cho người dùng
userRoute(app);

// Khởi tạo các route cho Spa
spaRoute(app);

// Khởi tạo các route cho Trainer
trainerRoute(app);

// Export ứng dụng
export default app;
