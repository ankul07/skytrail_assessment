import { User } from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { sendToken } from "../utils/token.utils.js";
import sendMail from "../utils/email.helper.js";

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
export const create = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400));
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide an email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const profile = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const update = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Logout user & clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {});
