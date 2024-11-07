import express from 'express';
import connectDB from './src/mongoose.js';
import bodyParser from 'body-parser';
import { userRoute } from './src/routes/userRoute.js';
import { spaRoute } from './src/routes/spaRoute.js';
import { trainerRoute } from './src/routes/trainerRoute.js';
import dotenv from 'dotenv';
import { postRoute } from './src/routes/postRoute.js';
import { dognameRoute } from './src/routes/dognameRoute.js';
import { dogBreedRoute } from './src/routes/dogbreedRoute.js';
import { dogSellerRoute } from './src/routes/dogsellerRoute.js';
import { productRoute } from './src/routes/productRoute.js';
import { reviewRoute } from './src/routes/reviewRoute.js';
import helmet from 'helmet';
import cors from 'cors';
import { favoriteItemRoute } from './src/routes/favoritemRoute.js';

dotenv.config();

// Kết nối đến MongoDB
connectDB();

const app = express();

// Middleware bảo mật
app.use(helmet()); // Sử dụng Helmet để tăng cường bảo mật
app.use(cors()); // Sử dụng CORS để cho phép các yêu cầu từ các nguồn khác nhau

// Middleware để cho phép sử dụng JSON trong req.body
app.use(express.json());

// Định nghĩa các route
userRoute(app);
spaRoute(app);
postRoute(app);
dognameRoute(app);
trainerRoute(app);
dogBreedRoute(app);
dogSellerRoute(app);
productRoute(app);
reviewRoute(app);
favoriteItemRoute(app);

// Export ứng dụng
export default app;
