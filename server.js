const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require('util');
const {createDepartment, viewDepartments, removeDepartment} = require("./routes/departments");
const {viewRoles, createRole, removeRole} = require("./routes/roles")
const {viewEmployees, createEmployee, removeEmployee } = require("./routes/employees")
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// viewDepartments();
// createDepartment();
// removeDepartment();

// viewRoles();
// createRole();
// removeRole();

// viewEmployees();
// createEmployee();
removeEmployee();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
