import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true, // hashed (bcrypt)
    },
    avatar: {
        type: String, // Cloudinary URL
        default: null,
    },
    // i dont think we need roles for this project
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },

    isPremium: {
        type: Boolean,
        default: false,
    },

    lastLogin: Date,
    // --- NEW GAMIFICATION FIELDS ---
    stats: {
        totalScore: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        maxStreak: { type: Number, default: 0 },
        lastQuizDate: { type: Date }, // Used to calculate streak breaks
        averageResponseTime: { type: Number, default: 0 }, // In seconds
        totalQuizzes: { type: Number, default: 0 },
    },

    hintsUsage: {
        count: { type: Number, default: 0 },
        lastUsed: { type: Date, default: null }
    },

    dailyActivity: {
        type: Map,
        of: Number,
        default: {}
    },

    achievements: [{
        name: { type: String, required: true },
        badgeId: String, // e.g., 'perfect_score', 'speed_master'
        unlockedAt: { type: Date, default: Date.now }
    }],

    solvedPuzzles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
},
    {
        timestamps: true
    })


export default mongoose.model("User", userSchema);