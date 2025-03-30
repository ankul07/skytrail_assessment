import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

/**
 * @desc Enable CORS (Cross-Origin Resource Sharing)
 * @config Allows requests from all origins (*), enables credentials, and restricts HTTP methods
 */
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     credentials: true, // Allow cookies and authorization headers
//   })
// );
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

/**
 * @desc Middleware to parse cookies from incoming requests
 */
app.use(cookieParser());

/**
 * @route   GET /test
 * @desc    A test route to check server status
 * @access  Public
 */
app.get("/test", (req, res) => {
  res.send("<h1>Welcome to root path!</h1>");
});

/**
 * @desc Middleware to parse URL-encoded bodies
 * @config Extended: true allows for rich objects and arrays
 * @config Limit: "50mb" increases the payload limit
 */
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/**
 * @desc Import and use user-related routes
 */
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

/**
 * @desc Global error handling middleware
 */
app.use(globalErrorHandler);

export default app;
