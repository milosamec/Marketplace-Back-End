const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env variables / config file / specify path
dotenv.config({ path: "./config/config.env" });

// Route Files
const products = require("./routes/products");
const users = require("./routes/users");

// Initialize express
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
app.use("/api/v1/products", products);
app.use("/api/v1/users", users);

// Middleware is executed in linear order
// Has to be initialized after routers
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

module.exports = app;
