import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

const startServer = () => {
  app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running on port ${config.SERVER_PORT}`);
  });
};

const initializeApp = async () => {
  await connectToDB();
  startServer();
};

initializeApp();