/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('userex', (table) => {
    table.increments('id').primary();
    table.string('user_name').notNullable().unique;
    table.string('email').notNullable().unique;
    table.string('password').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('bike_model');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
