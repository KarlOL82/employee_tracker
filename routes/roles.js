const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");
// const {runTracker} = require("./question")
const {askAgainRoles} = require("../helpers/askAgain");

// const {
//     createDepartment,
//     viewDepartments,
//     removeDepartment,
//   } = require("./departments");

//   const {
//     viewEmployees,
//     createEmployee,
//     updateRole,
//     removeEmployee,
//   } = require("./employees");

  db.query = utils.promisify(db.query);

// function askAgainRoles() {
//     inquirer
//       .prompt([
//         {
//           message: "What area would you like to access?",
//           name: "selection",
//           type: "list",
//           choices: [
//             "View Departments",
//             "Add New Department",
//             "Remove Department",
//             "View All Roles",
//             "Add New Role",
//             "Remove Role",
//             "View All Employees",
//             "Add New Employee",
//             "Update Employee Role",
//             "Remove Employee",
//             "Exit Program",
//           ],
//         },
//       ])
//       .then((answer) => {
//         switch (answer.selection) {
//           case "View Departments":
//             viewDepartments();
//             console.log("");
            
//             break;
//           case "Add New Department":
//             createDepartment();
//             console.log("");
            
//             break;
//           case "Remove Department":
//             removeDepartment();
//             console.log("");
            
//             break;
//           case "View All Roles":
//             viewRoles();
//             console.log("");
            
//             break;
//           case "Add New Role":
//             createRole();
//             console.log("");
            
//             break;
//           case "Remove Role":
//             removeRole();
//             console.log("");
            
//             break;
//           case "View All Employees":
//             viewEmployees();
//             console.log("");
//             ;
//             break;
//           case "Add New Employee":
//             createEmployee();
//             console.log("");
            
//             break;
//           case "Update Employee Role":
//             updateRole();
//             console.log("");
            
//             break;
//           case "Remove Employee":
//             removeEmployee();
//             console.log("");
            
//             break;
//           default:
//             console.log("Invalid Entry");
//             break;
//           case "Exit Program":
//             console.log("Session Ended");
//             process.exit();
          
//         }
//       });
//   }

const rolesList = async () => {
    const roleData = await db.query(
        `SELECT * 
        FROM roles
        `
    );
    return roleData;
};

// Displays all current roles in the console
const viewRoles = async () => {
    const roleTable = await rolesList();
    console.log("\n");
    console.table(roleTable);
    console.log("Use up or down keys to continue.");
    askAgainRoles();
};

// Creates a new role and adds it to the database
const createRole = async () => {

    let departments = await db.query("SELECT id, dept_name FROM departments");

    let departmentChoices = departments.map( departments => ({
        name: departments.dept_name,
        value: departments.id
    }));

    

    const roleArray = await inquirer.prompt([

        {
            message: "What is the title of the new role?",
            name: "roleTitle",
            type: "input",
        },
        
        {
            message: "Which department does the role belong to?",
            name: "roleDept",
            type: "list", 
            choices: departmentChoices,

        },
        {
            message: "What is the salary for this role?",
            name: "roleSalary",
            type: "input",
            validate: function (value) {
                let pass = !isNaN(value);
                if (pass) {
                    return true;
                } return "Please enter a valid number."
            },
        },
    ]);

    await db.query(
        `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`,
        [roleArray.roleTitle, roleArray.roleDept, roleArray.roleSalary]
        );

        console.log("");
        console.log("New role added.");
        console.log("");
        askAgainRoles();
};


// Removes an existing role
const removeRole = async () => {
    let roles = await rolesList();
    
    let roleChoices = roles.map( (roles) => ({
        
        name: roles.title,
        value: roles.id,
        
    }));
    
    
    
    const roleToDelete = await inquirer.prompt([
        {
        message: "Which role would you like to remove?",
        name: "deletedRole",
        type: "list",
        choices: roleChoices, 
        },
    ]);

    await db.query(
        `DELETE FROM roles WHERE id = ?`,
        roleToDelete.deletedRole
    );
    console.log("");
    console.log("Chosen role removed.");
    console.log("");
    askAgainRoles();
    
}


module.exports = { viewRoles, createRole, removeRole, rolesList };