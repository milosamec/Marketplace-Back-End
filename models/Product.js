const db = require("../config/db");

async function add(product) {
  const [id] = await db("products").insert(product);
  return findById(id);
}

async function findAll() {
  return await db("products");
}

function findById(id) {
  return db("products")
    .select("id", "userid", "title", "description", "price", "image")
    .where({ id })
    .first();
}

async function update(changes, id) {
  await db("products").where({ id }).update(changes);
  return await findById(id);
}

async function remove(id) {
  await db("products").where({ id }).delete();
}

module.exports = {
  add,
  findAll,
  findById,
  update,
  remove,
};
