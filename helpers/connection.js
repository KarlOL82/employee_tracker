const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'N3buchadnezzar!3',
      database: 'teamDirectory_db'
    },
    console.log(`Connected to the teamDirectory_db database.`)
);


module.exports = { db };