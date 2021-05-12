const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");

// Protect Routes Middleware
exports.protect = asyncHandler(async (req, res, next) => {
  // Define a token variable
  let token;

  // Check if token is being sent
  if (req.headers.authorization) {
    // If yes, set it to the token variable
    token = req.headers.authorization;
  }

  // If the token does not exist
  if (!token) {
    // Return an error saying no access
    return res
      .status(400)
      .json({ success: false, msg: "Not authorized to access this route" });
  }

  // Otherwise
  // Verify Token
  try {
    // Decode the token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Modify the request:
    // Save the user in req.user
    // Look him up in the db
    req.user = await User.findById(decoded.id);
    
    // Move on with the request by calling next
    next();
  } catch (err) {
    // Return server error if anything goes wrong
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
});
