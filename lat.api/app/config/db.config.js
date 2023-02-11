const mysql = require('mysql');

const connection = mysql.createConnection({
   host: "localhost",
  user: "root",
  password: "",
  database: "lat"
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error.stack);
    return;
  }
  console.log('Successfully connected to the database.' );
});

module.exports = connection;
