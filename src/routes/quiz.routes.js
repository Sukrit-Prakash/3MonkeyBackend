import express from "express";
import { submitQuiz, useHint } from "../controllers/quiz.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/submit", verifyToken, submitQuiz);
router.post("/hint", verifyToken, useHint);

export default router;
