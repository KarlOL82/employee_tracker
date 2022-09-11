const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");
const {askAgain} = require("../helpers/askAgain");

// const { 
//     viewRoles, 
//     createRole, 
//     removeRole 
//   } = require("./roles");

  
//   const {
//     viewEmployees,
//     createEmployee,
//     updateRole,
//     removeEmployee,
//   } = require("./employees");

db.query = utils.promisify(db.query);



// function askAgain() {
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
//   };

const deptList = async () => {
    const deptData = await db.query(
        `SELECT id, dept_name FROM departments`
    );
    return deptData;
};

// Displays all current departments in the console
const viewDepartments = async () => {
    const deptTable = await deptList();
    console.log("\n");
    console.table(deptTable);
    console.log("Use up or down keys to continue.");
    askAgain();
};

// Creates a new department and adds it to the database
const createDepartment = async () => {

    let departments = await db.query("SELECT * FROM departments");

    console.log("\n");
    console.table(departments);

    // let departmentChoices = departments.map( departments => ({
    //     name: departments.dept_name,
    //     value: departments.id
    // };

    

    const answers = await inquirer.prompt([

        {
            message: "What is the name of this department?",
            name: "deptName",
            type: "input", 

        },
    ]);

        db.query(
        `INSERT INTO departments (dept_name) VALUES (?)`,
        answers.deptName
        );
        
        console.log("");
        console.log("New department added.");
        console.log("");
        askAgain();

        // viewDepartments();
        //runTracker();
};



// Removes an existing department
const removeDepartment = async () => {
    let departments = await deptList();

    let departmentChoices = departments.map( departments => ({
        name: departments.dept_name,
        value: departments.id
    }));
    
    const deptChoice = await inquirer.prompt([
        {
        message: "Which department would you like to remove?",
        name: "deletedDept",
        type: "list",
        choices: departmentChoices, 
        },
    ]);

    await db.query(
        `DELETE FROM departments WHERE id = ?`,
        deptChoice.deletedDept
    );
    console.log("");
    console.log("Chosen department removed.");
    console.log("");
    askAgain();
    // viewDepartments();
}


module.exports = { createDepartment, viewDepartments, removeDepartment, askAgain };