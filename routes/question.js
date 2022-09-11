const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");
const {askAgain} =require("../helpers/askAgain")

const {
  createDepartment,
  viewDepartments,
  removeDepartment,
} = require("./departments");

const { 
  viewRoles, 
  createRole, 
  removeRole 
} = require("./roles");

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
      askAgain();
    }); 
    
};


module.exports = {runTracker};


