exports.up = async function (knex) {
  return knex.schema.createTable("products", (products) => {
    products.increments("id");
    products.string("userId").notNullable().references("id").inTable("users");
    products.string("title", 80).notNullable().unique();
    products.string("description", 500);
    products.integer("price").notNullable();
    products.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
