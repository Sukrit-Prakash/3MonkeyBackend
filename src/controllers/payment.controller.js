import User from "../models/User.js";

export const subscribePremium = async (req, res) => {
    try {
        const userId = req.user.id;

        // In a real app, verify payment signature/receipt here

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isPremium = true;
        await user.save();

        return res.status(200).json({
            message: "Upgraded to Premium successfully!",
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
        console.error("Payment Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
