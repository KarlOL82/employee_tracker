const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "N3buchadnezzar!3",
    database: "teamDirectory_db",
  },
  console.log(`Connected to the teamDirectory_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
