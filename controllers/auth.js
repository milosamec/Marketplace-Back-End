const ErrorHandler = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc Register User
// @route POST /api/v1/users/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // If username is less than 3 chars
  // Return Error
  if (username.length < 3) {
    return next(
      new ErrorHandler("Username must be at least 3 characters long", 401)
    );
  }

  // If password is less then 6 chars
  // Return Error
  if (password.length < 6) {
    return next(
      new ErrorHandler("Password must be at least 6 characters long", 401)
    );
  }

  // Look for user in DB
  const userExists = await User.findBy({ username }).first();

  // If user exists
  // Return Error
  if (userExists) {
    return next(
      new ErrorHandler(
        "This username is already taken, please choose a different username",
        401
      )
    );
  }

  // Create user
  // Encrypt password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const user = await User.add({
    username,
    password: await bcrypt.hash(password, salt),
  });

  res.status(201).json(user);
});

// @desc Login User
// @route POST /api/v1/users/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate username & password
  if (!username || !password) {
    return next(
      new ErrorHandler("Please provide a username and password", 401)
    );
  }

  // Check for user in database
  user = await User.findBy({ username }).first();

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  // Match user entered password to hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  // Sign JWT and return
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  user = { ...user };
  delete user.password;

  res.status(200).json({
    success: true,
    token,
    user,
  });
});
