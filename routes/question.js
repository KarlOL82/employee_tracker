const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require("util");

const {
  createDepartment,
  viewDepartments,
  removeDepartment,
} = require("./departments");
const { viewRoles, createRole, removeRole } = require("./roles");
const {
  viewEmployees,
  createEmployee,
  updateRole,
  removeEmployee,
} = require("./employees");

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
          runTracker();
          break;
        case "Add New Department":
          createDepartment();
          console.log("");
          // runTracker();
          break;
        case "Remove Department":
          removeDepartment();
          console.log("");
          runTracker();
          break;
        case "View All Roles":
          viewRoles();
          console.log("");
          runTracker();
          break;
        case "Add New Role":
          createRole();
          console.log("");
          runTracker();
          break;
        case "Remove Role":
          removeRole();
          console.log("");
          runTracker();
          break;
        case "View All Employees":
          viewEmployees();
          console.log("");
          runTracker();
          break;
        case "Add New Employee":
          createEmployee();
          console.log("");
          runTracker();
          break;
        case "Update Employee Role":
          updateRole();
          console.log("");
          runTracker();
          break;
        case "Remove Employee":
          removeEmployee();
          console.log("");
          runTracker();
          break;
        default:
          console.log("Invalid Entry");
          break;
        case "Exit Program":
          console.log("Session Ended");
          process.exit();
        // break;
      }
    });
}

module.exports = { runTracker };

// const topMenuQs = [
//     {
//         name: "Departments",
//         value: "departments",
//     },
//     {
//         name: "Roles",
//         value: "roles",
//     },
//     {
//         name: "Employees",
//         value: "employees",
//     },
//     {
//         name: "Exit Program",
//         value: "exit",
//     }
// ];

// const departmentOptions = [
//     {
//         name: "View Departments",
//         value: "view_departments",
//     },
//     {
//         name: "Add New Department",
//         value: "add_department",
//     },
//     {
//         name: "Remove Department",
//         value: "remove_department",
//     },
//     {
//         name: "Previous Screen",
//         value: "go_back",
//     },

// ];

// const roleOptions = [
//     {
//         name: "View Roles",
//         value: "view_roles",
//     },
//     {
//         name: "Add New Role",
//         value: "add_role",
//     },
//     {
//         name: "Remove Role",
//         value: "remove_role",
//     },
//     {
//         name: "Previous Screen",
//         value: "go_back",
//     },

// ];

// const employeeOptions = [
//     {
//         name: "View Employees",
//         value: "view_employees",
//     },
//     {
//         name: "Add New Employee",
//         value: "add_employee",
//     },
//     {
//         name: "Remove Employee",
//         value: "remove_employee",
//     },
//     {
//         name: "Update Employee Role",
//         value: "update_role"
//     },
//     {
//         name: "Previous Screen",
//         value: "go_back",
//     },

// ];

// module.exports = {topMenuQs, departmentOptions, roleOptions, employeeOptions }
