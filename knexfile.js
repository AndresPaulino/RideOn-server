require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: process.env.SERVER_PWD,
    database: 'users',
    charset: 'utf8',
  },
};
