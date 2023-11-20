import express from 'express';
import mongoose from 'mongoose';
import logger from './config/logger.config';
import authRouter from './routes/authRouter';


const app = express();


// Middleware for parsing JSON
app.use(express.json());


app.use('/api/v1/auth', authRouter);


// This might be handled better in your main server file
app.on('close', () => {
  mongoose.connection.close();
});

export default app;