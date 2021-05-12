const ErrorHandler = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc Register User
// @route POST /api/v1/users/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  
  // These checks username and password checks 
  // could also be done on the front end to avoid unnecessary API calls
  
  // Destructure body
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
  // Generate a salt
  // Encrypt password using bcrypts' hash by passing it the password and salt
  const salt = await bcrypt.genSalt(10);
  const user = await User.add({
    username,
    password: await bcrypt.hash(password, salt),
  });

  // Respond with 201 on successful user creation
  res.status(201).json(user);
});

// @desc Login User
// @route POST /api/v1/users/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  // Destructure body
  const { username, password } = req.body;

  // Validate username & password
  // Return error if it's missing username or password
  if (!username || !password) {
    return next(
      new ErrorHandler("Please provide a username and password", 401)
    );
  }

  // Check for user in database
  user = await User.findBy({ username }).first();

  if (!user) {
    // If user does not exist, return error
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  // Match users entered password to hashed password in database
  // By passing entered password + hashed password in db to bcrypt compare
  const isMatch = await bcrypt.compare(password, user.password);

  // If it doesn't match
  if (!isMatch) {
    // Return an error
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  // Otherwise we want to create a token for the user
  // Sign JWT using secret and return it to the user
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  // Spread the user to create a copy
  user = { ...user };
  // And delete users password from the response before returning the user and token
  delete user.password;

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

