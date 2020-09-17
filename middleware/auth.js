const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");

// Protect Routes Middleware
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  // Make sure token exists in headers
  if (!token) {
    return res
      .status(400)
      .json({ success: false, msg: "Not authorized to access this route" });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
});
