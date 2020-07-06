import * as Knex from 'knex';
import groupnames from '../src/app/util/groupnames.json';

export async function seed(knex: Knex): Promise<any> {
  const data = groupnames.names.map((name) => {
    return { name };
  });
  // Deletes ALL existing entries
  return knex('groups')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('groups').insert(data);
    });
}
