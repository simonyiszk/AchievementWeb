require("dotenv").config();
require("ts-node/register");

module.exports = {
  development: {
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: process.env.SQLITE_DBNAME,
    },
    migrations: {
      tableName: "migrationTable",
      extension: "ts",
      directory: "./migrations",
    },
    seeds: {
        extension: "ts",
        directory: "./seeds",
    }
  },
  production: {
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: process.env.SQLITE_DBNAME,
    },
    migrations: {
      tableName: "migrationTable",
      extension: "ts",
      directory: "./migrations",
    },
  },
};
