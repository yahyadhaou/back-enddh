var mysql = require("mysql2");
const dotenv = require("dotenv");
const PoolManager = require("mysql-connection-pool-manager");
dotenv.config();

var connection = mysql.createPool({
  connectionLimit: process.env.CONNECTIONLIMIT || 100,
  host: process.env.MYSQL_HOST ,
  user: process.env.MYSQL_USER ,
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE ,
  charset: "cp1256",
  port: process.env.DB_PORT || 3306
});

connection.getConnection((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Database Connected..");
  }
});

module.exports = connection;
