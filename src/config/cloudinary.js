import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

// console.log("Cloudinary:", {
//   cloud: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
