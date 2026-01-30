import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

/**
 * @desc Register user and return JWT token
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};
