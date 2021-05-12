// Import knex
const knex = require("knex");

// Grab config
const knexConfig = require("../knexfile.js");

// DB Connected
console.log("Database Connected");

// Export knex
module.exports = knex(knexConfig.development);
