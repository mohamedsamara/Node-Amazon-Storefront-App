exports.mysql = {
  host: 'localhost',
  port: 3306,
  database: 'bamazon',
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD
};
