import mongoose from "mongoose";


// MongooseError: The `uri` parameter to `openUri()` must be a string,
//  got "undefined". Make sure the first parameter to `mongoose.connect()` 
//  or `mongoose.createConnection()` is a string.
//  there was a path related issue with dotenv config in server.js


const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    // console.log("Environment variables:", process.env.MONGO_URI);
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

export default connectDB;
