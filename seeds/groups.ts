import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("groups").insert([
        { name: "AC Stúdió & Live" },
        { name: "Budavári Schönherz Stúdió" },
        { name: "HA5KFU" },
        { name: "LEGO Kör" },
        { name: "Kir-Dev" },
        { name: "Menedzsment Kör" },
        { name: "Schönherz Design Stúdió" },
        { name: "Schönherz Elektronikai Műhely" },
        { name: "SPOT Fotókör" },
        { name: "Simonyi Károly Szakkollégium" },
      ]);
    });
}
