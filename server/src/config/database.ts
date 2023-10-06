import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MongoURI: string = process.env.MONGO_URI as string;

const connectToDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    // console.log(MongoURI);
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;