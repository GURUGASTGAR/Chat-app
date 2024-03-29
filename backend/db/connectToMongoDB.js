import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const connectToMongoDB = async () => {
  try {
    mongoose.connect(MONGO_DB_URI);
  } catch (error) {
    console.log("unable to connect to database:", error);
  }
};

export default connectToMongoDB;
