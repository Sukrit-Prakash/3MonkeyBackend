import QuizAttempt from "../models/QuizAttempt.js"
import User from "../models/User.js"

export const getLeaderboards = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Today's Smartest 🧠 
        // Logic: Highest IQ scores achieved in the last 24 hours

        const todaysSmartest = await QuizAttempt.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $sort: { iqScore: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    iqScore: 1,
                    score: 1,
                    difficulty: 1,
                    "userDetails.name": 1,
                    "userDetails.avatar": 1
                }
            }
        ]);

        // 2. Fastest Solvers ⚡
        // Logic: Users with high scores (8+) sorted by lowest timeTaken
        
        const fastestSolvers = await QuizAttempt.aggregate([
            { $match: { score: { $gte: 8 } } }, // Only count high-quality attempts
            { $sort: { timeTaken: 1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    timeTaken: 1,
                    score: 1,
                    category: 1,
                    "userDetails.name": 1,
                    "userDetails.avatar": 1
                }
            }
        ]);

        // 3. Longest Streak 🔥
        // Logic: Users currently on their longest daily winning streak
        const topStreaks = await User.find({})
            .sort({ "stats.currentStreak": -1 })
            .limit(10)
            .select("name avatar stats.currentStreak");

        return res.status(200).json({
            todaysSmartest,
            fastestSolvers,
            topStreaks
        });

    } catch (error) {
        console.error("Leaderboard Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};