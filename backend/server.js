import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

// Configuration
const app = express();
const port = 4000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// API End-Points
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.json('API Working Fine');
});

app.listen(port, async () => {
  await connectDB();
  console.log('Server started successfully');
});
