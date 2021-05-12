const db = require("../config/db");

// Adds user in db and returns the id
async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

// Finds user by username - id + username + pass
function findBy(username) {
  return db("users").select("id", "username", "password").where(username);
}

// Finds user user by username and returns the id + username
function findUserObject(username) {
  return db("users").select("id", "username");
}

// Finds user by id
function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

// Exports all defined functions
module.exports = {
  findBy,
  add,
  findById,
  findUserObject,
};
