const db = require("../config/db");

// Add function takes in product
async function add(product) {
  // grabs products id and adds it to the db
  const [id] = await db("products").insert(product);
  // returns id of added product
  return findById(id);
}

// Returns all products
async function findAll() {
  return await db("products");
}

// Finds product by it's id
function findById(id) {
  return db("products")
    .select("id", "userid", "title", "description", "price", "image")
    .where({ id })
    .first();
}

// Updates product by taking in changes + products id
async function update(changes, id) {
  await db("products").where({ id }).update(changes);
  return await findById(id);
}


// removes product by id
async function remove(id) {
  await db("products").where({ id }).delete();
}

// Exports all defined functions
module.exports = {
  add,
  findAll,
  findById,
  update,
  remove,
};
