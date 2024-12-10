var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();

var conf = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'u488326007_hamilo_persons',

  connectTimeout: 10000,
  acquireTimeout: 10000,
  keepAlive: true
};

var connection = mysql.createPool(conf);

module.exports = connection;