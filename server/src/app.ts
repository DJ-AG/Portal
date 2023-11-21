import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware';
import dotenv from 'dotenv';

dotenv.config()

import * as config from './utils/config';

const app = express();

app.use(cookieParser());

import auth from './routes/authRouter';

// Cors is required during development to allow the frontend access to
// the backend. In production, the frontend and backend are served from
// the same domain so cors is not needed. Unless other website frontends
// on different domains need to use the API.
if (config.node_env === 'development') app.use(cors());

// Middlewares that need to be applied before adding routes.
app.use(express.json());
app.use(express.static('../client/dist'));
app.use(requestLogger);

// Add routes
// app.use();

// Middlewares that need to be applied after adding routes.
app.use('/api/auth', auth);

app.use('/api/*', unknownEndpoint);
app.use(errorHandler);

// Paths that are not part of the API are handled by the frontend.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Close the database connection when the app is closed.
app.on('close', () => mongoose.connection.close());

export default app;