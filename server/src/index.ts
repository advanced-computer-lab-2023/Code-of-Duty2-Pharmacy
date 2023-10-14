import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config/config';

import medicineRouter from './routes/medicineRoutes';
import patientRouter from './routes/patientRoutes';
import registrationRouter from './routes/registrationRoutes';
import adminRouter from './routes/adminRoutes';
import pharmacistRouter from './routes/pharmacistRoutes';
import pharmacistRegistrationRequestRouter from './routes/pharmacistRegistrationRequestRoutes';

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

app.use(cors(config.corsOptions));
app.use(express.json());

app.use('/medicines', medicineRouter);
app.use('/patients', patientRouter);
app.use('/pharmacists', pharmacistRouter);
app.use('/register', registrationRouter);
app.use('/admins', adminRouter);
app.use('/pharmacist-registration-requests', pharmacistRegistrationRequestRouter);
