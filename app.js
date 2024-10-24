import express from 'express';
import mongoose from './mongoose.js';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Router cho người dùng
app.use('/users', userRouter);

export default app;
