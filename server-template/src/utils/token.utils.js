/**
 * Generates and sends an access token and refresh token to the client.
 *
 * @param {Object} user - The authenticated user object
 * @param {number} statusCode - HTTP status code for the response
 * @param {Object} res - Express response object
 */
export const sendToken = (user, statusCode, res) => {
  // Generate JWT access and refresh tokens
  const accessToken = user.getAccessToken();

  // Cookie options for storing the refresh token

  // Send response with tokens and user data
  res.status(statusCode).json({
    success: true,
    message: "User Login Successfully",
    data: user, // Send user data (consider omitting sensitive fields)
    accessToken, // Send access token in response
  });
};
