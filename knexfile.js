module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./_data/database/marketplace.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./_data/migrations",
      tableName: "db",
    },
    seeds: { directory: "./_data/seeds" },
  },
};
