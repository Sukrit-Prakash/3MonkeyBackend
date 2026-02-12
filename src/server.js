import dotenv from "dotenv";
// dotenv.config();
dotenv.config({ path: "./config/.env" });

import app from "./app.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
