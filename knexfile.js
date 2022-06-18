require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    host: 'ride-on.mysql.database.azure.com',
    user: 'apaulino01',
    password: process.env.SERVER_PWD,
    database: 'ride-on',
    charset: 'utf8',
  },
};
