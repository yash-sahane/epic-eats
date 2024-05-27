import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import foodRouter from './routes/Food.js';

export const app = express();

app.use(express.json());

// routes
app.use('/api/food/', foodRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World');
})

config({
  path: './database/config.env'
})

app.use(cors());