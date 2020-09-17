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
    return res
      .status(409)
      .json({ msg: "Username must be at least 3 characters long" });
  }

  // If password is less then 6 chars
  // Return Error
  if (password.length < 6) {
    return res
      .status(409)
      .json({ msg: "Password must be at least 6 characters long" });
  }

  // Look for user in DB
  const userExists = await User.findBy({ username }).first();

  // If user exists
  // Return Error
  if (userExists) {
    return res.status(401).json({
      msg: "This username is already taken, please choose a different username",
    });
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
    return res.status(401).json({
      msg: "Please provide a username and password",
    });
  }

  // Check for user in database
  user = await User.findBy({ username }).first();

  if (!user) {
    return res.status(401).json({
      msg: "Invalid Credentials",
    });
  }

  // Match user entered password to hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      msg: "Invalid Credentials",
    });
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
