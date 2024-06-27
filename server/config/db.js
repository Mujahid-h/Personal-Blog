import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Databse connected!");
  } catch (error) {
    console.log("Error while connecting with databse: ", error);
  }
};

export default connectDB;
