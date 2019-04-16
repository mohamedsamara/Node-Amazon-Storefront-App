// This file is to connect to mysql database

require('dotenv').config();
const mysql = require('mysql');

const keys = require('./keys.js');
const connection = mysql.createConnection(keys.mysql);

connection.connect(function(err) {
  if (err) throw err;
  //   console.log('connected as id ' + connection.threadId);
});
