import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.string("authSchId");
    })
    .createTable("groups", (table) => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("achievements", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("category");
      table.integer("level");

      table
        .integer("groupId")
        .unsigned()
        .references("id")
        .inTable("groups")
        .index();
    })
    .createTable("users_achievements", (table) => {
      table.increments("id").primary();

      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .index();

      table
        .integer("achievementId")
        .unsigned()
        .references("id")
        .inTable("achievements")
        .index();
      table.enum("status", ["pending", "completed", "rejected"]);
      table.dateTime("dateRequested");
      table.dateTime("dateClosed");
      table.binary("img");
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists("users_achievements")
    .dropTableIfExists("achievements")
    .dropTableIfExists("groups")
    .dropTableIfExists("users");
}
