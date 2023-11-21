import express from 'express';
import mongoose from 'mongoose';
import logger from './config/logger.config';
import authRouter from './routes/authRouter';
import cors from 'cors';


const app = express();


// Middleware for parsing JSON
app.use(express.json());

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));


app.use('/api/v1/auth', authRouter);


// This might be handled better in your main server file
app.on('close', () => {
  mongoose.connection.close();
});

export default app;