import express from 'express';
import connectDB from './config/connectDB';
import * as config from './utils/config';
import logger from './config/logger.config';
import app from './app';



const startServer = async () => {
  try {
    logger.info("Connecting to database...");
    await connectDB(config.mongoUri);
    logger.info(`Database connected running in ${config.node_env}`);

    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}...`);
    });
  } catch (error) {
    logger.error(`Error connecting to database: ${error}`);
    process.exit(1); // Exit with failure
  }
};

startServer();