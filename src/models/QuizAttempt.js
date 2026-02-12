import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: String,

    difficulty: String,
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: Number,
    
    // --- NEW PERFORMANCE FIELDS ---
    timeTaken: { 
        type: Number, 
        required: true // Time in seconds for the whole quiz
    },
    iqScore: { 
        type: Number, 
        default: 0 // Calculated on the backend after submission
    },
    //   to be implemented later
    // answers: [
    //   {
    //     question: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Question",
    //     },
    //     selectedIndex: Number,
    //     isCorrect: Boolean,
    //     timePerQuestion: Number, // Optional: for deeper "Speed Master" analytics
    //   },
    // ],
    completedAt: {
        type: Date,
        default: Date.now
    }
  },
  { timestamps: true }
);

// Indexing for Leaderboards
quizAttemptSchema.index({ iqScore: -1 });
quizAttemptSchema.index({ createdAt: -1 });

export default mongoose.model("QuizAttempt", quizAttemptSchema);