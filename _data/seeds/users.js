exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      id: "1",
      name: "John Doe",
      username: "john@gmail.com",
      password: "123456",
    },
    {
      id: "2",
      name: "Kevin Smith",
      username: "kevin@gmail.com",
      password: "123456",
    },
  ]);
};
