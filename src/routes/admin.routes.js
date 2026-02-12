import express from "express";
import upload from "../utils/upload.js";
import cloudinary from "../config/cloudinary.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { getUsers, getQuestions, deleteQuestion, updateQuestion } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/questions", getQuestions);
router.delete("/questions/:id", deleteQuestion);
router.put("/questions/:id", upload.single("image"), updateQuestion);

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const premiumUsers = await User.countDocuments({ isPremium: true });
    const totalQuestions = await Question.countDocuments();
    const totalPuzzles = await Question.countDocuments({ difficulty: 'puzzle' });

    res.json({
      totalUsers,
      premiumUsers,
      totalQuestions,
      totalPuzzles
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post(
  "/questions",
  upload.single("image"),
  async (req, res) => {
    try {
      const question = await Question.create({
        question: req.body.question,
        options: JSON.parse(req.body.options),
        correctAnswerIndex: Number(req.body.correctAnswerIndex),
        difficulty: req.body.difficulty,
        isPremium: req.body.isPremium === "true",
        image: req.file ? req.file.path : (req.body.image || null),
        explanation: req.body.explanation || null,
        hint: req.body.hint || null,
        answer: req.body.answer || null
      });

      res.status(201).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create question" });
    }
  }
);


router.get("/", async (req, res) => {
  try {
    const { category, difficulty, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question
      .find(filter)
      .limit(Number(limit))
    // .select("-correctAnswerIndex"); // optional: hide answer for users

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});



// router.post(
//   "/questions",
//    authenticate,
//   isAdmin,
//   upload.single("image"),
//   uploadQuestion
// );

// router.get("/questions", authenticate, isAdmin, listQuestions);
// router.delete("/questions/:id", authenticate, isAdmin, deleteQuestion);

// router.get("/users", authenticate, isAdmin, listUsers);
// router.patch("/users/:id/premium", authenticate, isAdmin, togglePremium);

export default router;
