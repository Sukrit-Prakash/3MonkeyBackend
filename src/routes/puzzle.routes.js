import express from "express";
import { listPuzzles, submitPuzzle } from "../controllers/puzzle.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, listPuzzles);
router.post("/submit", verifyToken, submitPuzzle);

export default router;
