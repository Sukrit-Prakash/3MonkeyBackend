import express from "express";
import { subscribePremium } from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/subscribe", verifyToken, subscribePremium);

export default router;
