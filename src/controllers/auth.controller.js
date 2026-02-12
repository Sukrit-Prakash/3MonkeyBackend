import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isPremium: user.isPremium,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};




export const signin = async (req, res) => {
    // 1. Initial Body Check
    // Ensures req.body exists before trying to destructure. 
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            message: "Request body is missing. Ensure Content-Type is application/json." 
        });
    }

    try {
        const { email, password } = req.body;
        console.log("Login Attempt:", email);

        // 2. Field Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 3. User Lookup
        // .select("+password") is useful if your Schema hides the password by default
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Password Verification
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 5. Update Metadata
        user.lastLogin = new Date();
        await user.save();

        // 6. Token Generation
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // 7. Final Response (The Only One)
        // We use 'return' to ensure the function stops here.
        return res.status(200).json({
            message: "Login successful", // Combined the success message here
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isPremium: user.isPremium,
            },
            token,
        });

    } catch (error) {
        // 8. Centralized Error Handling
        console.error("Signin Error:", error);
        
        // Check if headers were already sent by a previous step to avoid crashing
        if (!res.headersSent) {
            return res.status(500).json({ 
                message: "Internal Server Error",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined 
            });
        }
    }
};