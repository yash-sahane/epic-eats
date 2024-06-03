import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import foodRouter from './routes/Food.js';
import userRouter from './routes/User.js';
import cartRouter from './routes/Cart.js';
import { errMiddleware } from './middlewares/error.js';

export const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/food/', foodRouter);
app.use('/api/user/', userRouter);
app.use('/api/cart/', cartRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World');
})

config({
  path: './database/config.env'
})

app.use(errMiddleware);