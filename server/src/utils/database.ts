import mongoose from "mongoose";
import config from "../config";

const connectToDB = async () => {
  try {
    console.log("Connecting to DB...");

    await mongoose.connect(config.mongo.uri);
    console.log("DB is now connected.");
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;
