const knex = require("knex");

const knexConfig = require("../knexfile.js");

console.log("Database Connected");

module.exports = knex(knexConfig.development);
