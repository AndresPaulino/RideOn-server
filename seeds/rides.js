const ridesData = [
  {
    id: 1,
    profile_img:
      'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    author: 'Andres Paulino',
    ride_title: 'The Hammocks to Cafe 27',
    ride_date: 'May 20, 2022',
    address1: '123 Main St',
    address2: 'Miami, FL 33198',
    ride_participants: 27,
    ride_time: '2:00 PM',
    ride_description: 'Looking for a group of buddies to go have a bit to eat!',
    ride_from: 'Miami, FL',
  },
  {
    id: 2,
    profile_img:
      'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    author: 'Hector Hernandez',
    ride_title: 'The Hammocks to Hog Heaven',
    ride_date: 'May 20, 2022',
    address1: '78392 Off St',
    address2: 'Miami, FL 33198',
    ride_participants: 14,
    ride_time: '9:00 AM',
    ride_description: 'Getting some drinks at the keys!',
    ride_from: 'Miami, FL',
  },
  {
    id: 3,
    profile_img:
      'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    author: 'Henry Johnson',
    ride_title: 'Miami to Ft. Lauderdale',
    ride_date: 'May 27, 2022',
    address1: '123 Rear St',
    address2: 'Miami, FL 33198',
    ride_participants: 7,
    ride_time: '10:00 AM',
    ride_description: 'Riding on the freeway to Ft. Lauderdale!',
    ride_from: 'Miami, FL',
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('rides')
    .del()
    .then(() => knex('rides').insert(ridesData));
};
