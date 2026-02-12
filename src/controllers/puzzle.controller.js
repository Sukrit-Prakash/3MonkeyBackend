import Question from "../models/Question.js";
import User from "../models/User.js";

export const listPuzzles = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all puzzle questions
        const puzzles = await Question.find({ difficulty: 'puzzle' })
            .select('-answer -explanation -options -correctAnswerIndex') // Hide answers
            .lean();

        // Fetch user's solved status
        const user = await User.findById(userId).select('solvedPuzzles').lean();
        const solvedSet = new Set(user.solvedPuzzles.map(id => id.toString()));

        // augment puzzles with status
        const puzzlesWithStatus = puzzles.map(p => ({
            ...p,
            isSolved: solvedSet.has(p._id.toString())
        }));

        res.json({
            puzzles: puzzlesWithStatus,
            total: puzzles.length,
            solvedCount: solvedSet.size
        });

    } catch (error) {
        console.error("List Puzzles Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const submitPuzzle = async (req, res) => {
    try {
        const userId = req.user.id;
        const { puzzleId, answer } = req.body;

        console.log("Submitting Puzzle:", { userId, puzzleId, answer });

        const puzzle = await Question.findById(puzzleId);
        if (!puzzle) {
            return res.status(404).json({ message: "Puzzle not found" });
        }

        // Safety check if puzzle has an answer field
        if (!puzzle.answer) {
            console.error(`Puzzle ${puzzleId} has no answer set in DB.`);
            return res.status(500).json({ message: "Puzzle configuration error" });
        }

        // Ensure it's actually a puzzle
        if (puzzle.difficulty !== 'puzzle') {
            return res.status(400).json({ message: "Invalid question type for submission" });
        }

        // Check Answer (Case insensitive)
        const isCorrect = puzzle.answer.toLowerCase() === answer.trim().toLowerCase();

        if (isCorrect) {
            const user = await User.findById(userId);

            // Add to solved list if not already there
            if (!user.solvedPuzzles.includes(puzzleId)) {
                user.solvedPuzzles.push(puzzleId);
                await user.save();
            }

            return res.json({
                success: true,
                message: "Correct!",
                explanation: puzzle.explanation
            });
        } else {
            return res.json({
                success: false,
                message: "Incorrect, try again!"
            });
        }

    } catch (error) {
        console.error("Submit Puzzle Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
