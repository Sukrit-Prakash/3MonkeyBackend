import User from "../models/User.js";
import QuizAttempt from "../models/QuizAttempt.js";

export const getProfileData = async (req, res) => {
    try {
        const userId = req.user.id; // From your auth middleware

        // 1. Fetch User with Stats and Achievements
        const user = await User.findById(userId)
            .select("-password") // Never send the password
            .lean(); // lean() for faster read-only access

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Fetch Recent Performance (Last 5 attempts)
        const recentAttempts = await QuizAttempt.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("category score totalQuestions difficulty iqScore createdAt");

        // 3. Prepare Heatmap Data
        // React Native heatmap components usually expect an array of { date, count }
        const heatmapData = [];
        if (user.dailyActivity) {
            // Convert the Map to a sorted array for the frontend
            Object.entries(user.dailyActivity).forEach(([date, count]) => {
                heatmapData.push({ date, count });
            });
        }

        // 4. Important Metadata
        // Calculate "Global Rank" (Optional but high-value for profiles)

        const globalRank = await User.countDocuments({
            "stats.totalScore": { $gt: user.stats.totalScore }
        }) + 1;

        return res.status(200).json({
            user: {
                ...user,
                globalRank,
                heatmapData
            },
            recentAttempts
        });

    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, avatar } = req.body;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (avatar) user.avatar = avatar;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isPremium: user.isPremium,
                stats: user.stats
            }
        });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};