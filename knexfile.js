module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.SERVER_PWD,
    database: 'RideOn',
    charset: 'utf8',
  },
};
