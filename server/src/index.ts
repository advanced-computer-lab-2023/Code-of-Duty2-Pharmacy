import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config/config';

import medicineRouter from './routes/medicineRoutes';

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB is now connected');
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

// app.use(cors(config.corsOptions));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.use('/medicines', medicineRouter);


