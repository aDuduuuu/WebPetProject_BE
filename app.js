import express from 'express';
import connectDB from './mongoose.js'; // Sử dụng connectDB từ mongoose.js
import bodyParser from 'body-parser';
import { userRoute } from './routes/userRoute.js'; // Import userRoute để sử dụng initUserRoute
import { spaRoute } from './routes/spaRoute.js'; // Import spaRoute để sử dụng initSpaRoute
import { trainerRoute } from './routes/trainerRoute.js'; // Import trainerRoute để sử dụng initTrainerRoute
import dotenv from 'dotenv';
import { postRoute } from './routes/postRoute.js';
import { dognameRoute } from './routes/dognameRoute.js';
import { dogBreedRoute } from './routes/dogbreedRoute.js';
import { dogSellerRoute } from './routes/dogsellerRoute.js';
import { productRoute } from './routes/productRoute.js';
import { reviewRoute } from './routes/reviewRoute.js';

dotenv.config();

// Kết nối đến MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Middleware để cho phép sử dụng JSON trong req.body

userRoute(app);
spaRoute(app);
postRoute(app);
dognameRoute(app);
trainerRoute(app);
dogBreedRoute(app);
dogSellerRoute(app);
productRoute(app);
reviewRoute(app);
// Export ứng dụng
export default app;
