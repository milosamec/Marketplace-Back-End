exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments("id");
    users.string("name", 45);
    users.string("username", 45).notNullable().unique();
    users.string("password", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
