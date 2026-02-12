import QuizAttempt from "../models/QuizAttempt.js"
import User from "../models/User.js";

export const submitQuiz = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes your auth middleware attaches user to req

        const { category, difficulty, score, totalQuestions,
            timeTaken,
            // answers
        } = req.body;

        // 1. Calculate IQ Score Mapping
        // Formula: Base 100 + (Difficulty Bonus * Score) - (Time Penalty)
        const difficultyWeights = { easy: 1, medium: 1.5, hard: 2 };
        const weight = difficultyWeights[difficulty] || 1;

        // Base IQ calculation logic
        let iqScore = 100 + (score * weight);
        // Penalty if they took more than 15 seconds per question on average
        if (timeTaken > totalQuestions * 15) {
            iqScore -= 10;
        }

        // 2. Create the Quiz Attempt Record
        const newAttempt = new QuizAttempt({
            user: userId,
            category,
            difficulty,
            score,
            totalQuestions,
            timeTaken,
            iqScore,
            // answers,
            completedAt: new Date()
        });

        await newAttempt.save();

        // 3. Update User Stats & Gamification Logic
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const lastQuizDate = user.stats.lastQuizDate
            ? user.stats.lastQuizDate.toISOString().split('T')[0]
            : null;

        // --- STREAK LOGIC ---
        if (!lastQuizDate) {
            // First quiz ever
            user.stats.currentStreak = 1;
        } else if (lastQuizDate === today) {
            // Already played today, maintain streak
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastQuizDate === yesterdayStr) {
                user.stats.currentStreak += 1;
            } else {
                user.stats.currentStreak = 1; // Streak broken
            }
        }

        // Update Max Streak if current is higher
        if (user.stats.currentStreak > user.stats.maxStreak) {
            user.stats.maxStreak = user.stats.currentStreak;
        }

        // --- DAILY ACTIVITY ---
        const currentActivity = user.dailyActivity.get(today) || 0;
        user.dailyActivity.set(today, currentActivity + 1);

        // --- GENERAL STATS UPDATE ---
        user.stats.totalScore += score;
        user.stats.totalQuizzes += 1;
        user.stats.lastQuizDate = new Date();

        // Rolling average for response time
        user.stats.averageResponseTime =
            ((user.stats.averageResponseTime * (user.stats.totalQuizzes - 1)) + timeTaken) / user.stats.totalQuizzes;

        // --- ACHIEVEMENT & BADGE ENGINE ---
        const newBadges = [];

        // Badge: Perfect Score
        if (score === totalQuestions && !user.achievements.some(a => a.badgeId === 'perfect_score')) {
            newBadges.push({ name: "Perfect Score", badgeId: "perfect_score" });
        }

        // Badge: Speed Master (Average < 5s per question)
        if (timeTaken < (totalQuestions * 5) && !user.achievements.some(a => a.badgeId === 'speed_master')) {
            newBadges.push({ name: "Speed Master", badgeId: "speed_master" });
        }

        // Badge: 7-Day Streak
        if (user.stats.currentStreak === 7 && !user.achievements.some(a => a.badgeId === '7_day_streak')) {
            newBadges.push({ name: "7-Day Streak", badgeId: "7_day_streak" });
        }

        if (newBadges.length > 0) {
            user.achievements.push(...newBadges);
        }

        await user.save();

        // 4. Send Response with "Unlocks" to trigger animations on Frontend
        return res.status(200).json({
            message: "Quiz submitted successfully",
            attempt: newAttempt,
            updates: {
                iqScore,
                currentStreak: user.stats.currentStreak,
                newAchievements: newBadges,
                isNewMaxStreak: user.stats.currentStreak === user.stats.maxStreak
            }
        });

    } catch (error) {
        console.error("Submission Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const useHint = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Premium Users have unlimited hints
        if (user.isPremium) {
            return res.status(200).json({ allowed: true, message: "Premium hint granted" });
        }

        const today = new Date().toISOString().split('T')[0];
        const lastUsed = user.hintsUsage.lastUsed
            ? user.hintsUsage.lastUsed.toISOString().split('T')[0]
            : null;

        // Reset if it's a new day
        if (lastUsed !== today) {
            user.hintsUsage.count = 0;
        }

        // Check Limit
        if (user.hintsUsage.count >= 3) {
            return res.status(403).json({
                allowed: false,
                message: "Daily hint limit reached. Upgrade to Premium for unlimited hints!"
            });
        }

        // Increment Usage
        user.hintsUsage.count += 1;
        user.hintsUsage.lastUsed = new Date();
        await user.save();

        return res.status(200).json({
            allowed: true,
            remaining: 3 - user.hintsUsage.count
        });

    } catch (error) {
        console.error("Hint Usage Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};