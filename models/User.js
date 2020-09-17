const db = require("../config/db");

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findBy(username) {
  return db("users").select("id", "username", "password").where(username);
}

function findUserObject(username) {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

module.exports = {
  findBy,
  add,
  findById,
  findUserObject,
};
