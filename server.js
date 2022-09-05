const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require('util');
const {createDepartment, viewDepartments} = require("./routes/departments")
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



viewDepartments();
createDepartment();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
