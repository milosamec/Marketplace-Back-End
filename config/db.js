const connectDB = async () => {
  const knex = require("knex");
  const knexConfig = require("../knexfile.js");
  knex(knexConfig.development);
  console.log("Database Connected");
};

module.exports = connectDB;
