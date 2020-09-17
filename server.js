const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables / config file
// specify path
dotenv.config({ path: "./config/config.env" });

// Route Files

// Connect to database
connectDB();

// Connect to database
// HERE
const app = express();

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Mount Routers

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
