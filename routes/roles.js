const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");
// const {createDepartment, viewDepartments, removeDepartment} = require("./departments");
db.query = utils.promisify(db.query);

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
}

// Creates a new role and adds it to the database
const createRole = async () => {

    let departments = await db.query("SELECT id, dept_name FROM departments");

    // console.table(roles);

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
        // viewRoles();
};

// Removes an existing role
const removeRole = async () => {
    let roles = await rolesList();
    // console.log(roles);
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
    // viewRoles();
    
}


module.exports = { viewRoles, createRole, removeRole, rolesList };