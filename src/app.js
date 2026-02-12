import express from "express";

import cors from "cors";
// well i guess what they say is true 
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import profileRoutes from "./routes/profile.routes.js";

import paymentRoutes from "./routes/payment.routes.js";
import puzzleRoutes from "./routes/puzzle.routes.js";

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/quiz", quizRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/puzzles", puzzleRoutes);

export default app;
