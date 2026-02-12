import express from "express";
import { getProfileData, updateProfile } from "../controllers/profile.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getProfileData);

router.put("/", verifyToken, updateProfile);

export default router;
