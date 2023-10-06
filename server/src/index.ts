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

app.use(cors());
app.use(express.json());

app.use('/medicines', medicineRouter);

// DUMMY DATA MEDICINE

// import Medicine from './models/Medicine';

// const addMedicine = async () => {
//   const newMedicine = new Medicine({
//     name: 'Test Medicine',
//     activeIngredients: ['Ingredient 1', 'Ingredient 2'],
//     price: 10.99,
//     availableQuantity: 100,
//   });

//   try {
//     await newMedicine.save();
//     console.log('Medicine saved successfully');
//   } catch (error) {
//     console.error('Error saving medicine:', error);
//   }
// };

// addMedicine();