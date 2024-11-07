import express from 'express';
import connectDB from './src/mongoose.js'; // Sử dụng connectDB từ mongoose.js
import bodyParser from 'body-parser';
import { userRoute } from './src/routes/userRoute.js'; // Import userRoute để sử dụng initUserRoute
import { spaRoute } from './src/routes/spaRoute.js'; // Import spaRoute để sử dụng initSpaRoute
import { trainerRoute } from './src/routes/trainerRoute.js'; // Import trainerRoute để sử dụng initTrainerRoute
import dotenv from 'dotenv';
import { postRoute } from './src/routes/postRoute.js';
import { dognameRoute } from './src/routes/dognameRoute.js';
import { dogBreedRoute } from './src/routes/dogbreedRoute.js';
import { dogSellerRoute } from './src/routes/dogsellerRoute.js';
import { productRoute } from './src/routes/productRoute.js';
import { reviewRoute } from './src/routes/reviewRoute.js';

dotenv.config();

// Kết nối đến MongoDB
connectDB();

const app = express();

// Middleware
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
