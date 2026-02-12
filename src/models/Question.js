import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    image: {
      type: String, // Cloudinary image URL
      default: null,
    },

    options: {
      type: [String],
      validate: [arr => arr.length === 4, "Exactly 4 options required"],
    },

    correctAnswerIndex: {
      type: Number,
      required: false, // Not required for puzzles
      min: 0,
      max: 3,
    },

    // For text-based puzzles
    answer: {
      type: String,
      trim: true,
      lowercase: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "puzzle"],
      index: true,
    },

    isPremium: {
      type: Boolean,
      default: false, // premium-only question?
    },

    explanation: {
      type: String,
      default: null,
    },

    hint: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);



// category: {
//   type: String,
//   enum: [
//     "general",
//     "science",
//     "history",
//     "sports",
//     "entertainment",
//     "geography",
//   ],
//   index: true,
// },