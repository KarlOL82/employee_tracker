const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require('util');
const {createDepartment, viewDepartments, removeDepartment} = require("./routes/departments");
const {viewRoles, createRole, removeRole} = require("./routes/roles")
const {viewEmployees, createEmployee, updateRole, removeEmployee } = require("./routes/employees");
const {topMenuQs, departmentOptions, roleOptions, employeeOptions } = require("./routes/question");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function runTracker() {
    const menuChoices = await inquirer.prompt([
        {
            message: "What area would you like to access?",
            name: "topMenu",
            type: "list",
            choices: topMenuQs,
        }
    ])
        
    
}


// viewDepartments();
// createDepartment();
// removeDepartment();

// viewRoles();
// createRole();
// removeRole();

// viewEmployees();
// createEmployee();
// removeEmployee();
// updateRole();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
