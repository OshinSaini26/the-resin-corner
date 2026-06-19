require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    //console.error("❌ MySQL connection failed:", err.message);
    console.error(err);
    return;
  }
  console.log("✅ MySQL connected successfully");
});

module.exports = db;

/*const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',          // keep empty if using XAMPP default
  database: 'resin_orders'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL connected successfully');
});

module.exports = db;*/
