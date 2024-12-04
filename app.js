// app.js
import express from 'express';
import connectDB from './src/mongoose.js';
import bodyParser from 'body-parser';
import { userRoute } from './src/routes/userRoute.js';
import { authRoute } from './src/routes/authRoute.js';
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
import { cartItemRoute } from './src/routes/cartItemRoute.js';
import { orderRoute } from './src/routes/orderRoute.js';
import { filterRoute } from './src/routes/filterRoute.js';
import { TProRoute } from './src/routes/topproductRoute.js';

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Định nghĩa các route
authRoute(app); 
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
orderRoute(app);
cartItemRoute(app);
filterRoute(app);
TProRoute(app);

export default app;
