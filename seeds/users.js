const usersData = [
  {
    id: 1,
    user_name: 'andresmp',
    email: 'apaul@gmail.com',
    password: '12345',
    first_name: 'Andres',
    last_name: 'Paulino',
    bike_model: 'Cruiser',
  },
  {
    id: 2,
    user_name: 'hectorxx',
    email: 'hector@gmail.com',
    password: '12345',
    first_name: 'Hector',
    last_name: 'Hernandez',
    bike_model: 'Harley',
  },
  {
    id: 3,
    user_name: 'timmy',
    email: 'timm@gmail.com',
    password: '12345',
    first_name: 'Tim',
    last_name: 'Vega',
    bike_model: 'Cruiser',
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => knex('users').insert(usersData))
};
