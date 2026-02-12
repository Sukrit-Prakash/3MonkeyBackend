import express from "express";
import { getLeaderboards } from "../controllers/leaderboard.controller.js";
// import { protect } from "../middleware/auth.middleware.js"; // If you want it private

const router = express.Router();

router.get("/", getLeaderboards);

export default router;