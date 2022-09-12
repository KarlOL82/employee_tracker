const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const utils = require("util");
const { db } = require("../employee_tracker/helpers/connection");


//required functions from each table in the database
const {
  createDepartment,
  viewDepartments,
  removeDepartment,
} = require("../employee_tracker/routes/question");

const { 
  viewRoles, 
  createRole, 
  removeRole 
} = require("../employee_tracker/routes/question");

const {
  viewEmployees,
  createEmployee,
  updateRole,
  removeEmployee,
} = require("../employee_tracker/routes/question");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Main function that initializes the app
function runTracker() {
  inquirer
    .prompt([
      {
        message: "What area would you like to access?",
        name: "selection",
        type: "list",
        choices: [
          "View Departments",
          "Add New Department",
          "Remove Department",
          "View All Roles",
          "Add New Role",
          "Remove Role",
          "View All Employees",
          "Add New Employee",
          "Update Employee Role",
          "Remove Employee",
          "Exit Program",
        ],
      },
      
    ])
    .then((answer) => {
      switch (answer.selection) {
        case "View Departments":
          viewDepartments();
          console.log("");
          
          break;
        case "Add New Department":
          createDepartment();
          console.log("");
          
          break;
        case "Remove Department":
          removeDepartment();
          console.log("");
          
          break;
        case "View All Roles":
          viewRoles();
          console.log("");
          
          break;
        case "Add New Role":
          createRole();
          console.log("");
          
          break;
        case "Remove Role":
          removeRole();
          console.log("");
          
          break;
        case "View All Employees":
          viewEmployees();
          console.log("");
          
          break;
        case "Add New Employee":
          createEmployee();
          console.log("");
          
          break;
        case "Update Employee Role":
          updateRole();
          console.log("");
          
          break;
        case "Remove Employee":
          removeEmployee();
          console.log("");
          
          break;
        default:
          console.log("Invalid Entry");
          break;
        case "Exit Program":
          console.log("Session Ended");
          process.exit();
        
      }; 
      
    }); 
    
};

runTracker();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



