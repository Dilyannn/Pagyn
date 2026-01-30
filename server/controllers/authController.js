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
      return res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user),
      });
    }

    res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      return res.json({
        message: "Login successful",
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
      });
    }

    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

/** 
 * @desc Get current logged in user's profile
 * @route GET /api/auth/profile
 * @access Private
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isPro: user.isPro,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

