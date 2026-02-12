import Question from "../models/Question.js";
import User from "../models/User.js";

import cloudinary from "../config/cloudinary.js";
//  i am not using this currently but i will use it in the future
export const uploadQuestion = async (req, res) => {
  let imageData = null;

  if (req.file) {
    const upload = await cloudinary.uploader.upload_stream(
      { folder: "quiz/questions" },
      async (error, result) => {
        if (error) throw error;
        //  WHAT IS THIS SECURE.URL AND PUBLIC_ID

        imageData = {
          url: result.secure_url,
          publicId: result.public_id,
        };

        const question = await Question.create({
          ...req.body,
          options: JSON.parse(req.body.options),
          image: imageData,
        });

        res.status(201).json(question);
      }
    );

    upload.end(req.file.buffer);

  } else {
    const question = await Question.create({
      ...req.body,
      options: JSON.parse(req.body.options),
    });
    res.status(201).json(question);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('name email isPremium stats createdAt')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error("Get Questions Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Delete Question Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.body.options) {
      updateData.options = JSON.parse(req.body.options);
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const question = await Question.findByIdAndUpdate(id, updateData, { new: true });
    res.json(question);
  } catch (error) {
    console.error("Update Question Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




