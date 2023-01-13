const mysql = require('mysql2');

//connect to db
const db = mysql.createConnection(
     {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'employee-tracker'
     },
     console.log('Logged into Employee Tracker Database')
);

module.exports = db;
