import express from "express";
import {
  authenticate,
  create,
  logout,
  profile,
  update,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  refreshToken,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/users/create
 * @desc    Create a new user account
 * @access  Public
 */
router.post("/register", create);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user and generate access token
 * @access  Public
 */
router.post("/login", authenticate);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile details
 * @access  Private (Requires Authentication)
 */
router.get("/profile", isAuthenticated, profile);

/**
 * @route   PUT /api/users/updateuser
 * @desc    Update user details
 * @access  Private (User-specific access control can be applied)
 */
router.put("/updateuser", update);

/**
 * @route   GET /api/users/logout
 * @desc    Log out user and clear session cookies/tokens
 * @access  Private
 */
router.get("/logout", logout);

/**
 * @route   GET /api/users/refresh-token
 * @desc    Refresh the access token using a valid refresh token
 * @access  Public (Token-based validation required)
 */
router.get("/refresh-token", refreshToken);

export default router;
