const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");
// const {deptList} = require("./departments");
db.query = utils.promisify(db.query);

const employeesList = async () => {
    const employeeData = await db.query(
        `SELECT employees.id, last_name, first_name, role_id, manager_id
        FROM employees
        JOIN roles on employees.role_id = roles.id
        JOIN departments on department_id = departments.id
        `
    );
    return employeeData;
};


// Displays all current employees in the console
const viewEmployees = async () => {
    const employeeTable = await employeesList();

    console.table(employeeTable);
}

// Creates a new employee and adds it to the database
const createEmployee = async () => {
    
    let roles = await db.query("SELECT id, title FROM roles");

    let roleChoices = roles.map( (roles) => ({
        name: roles.title,
        value: roles.id
    }));
    console.log(roleChoices);

    const managers = await employeesList();

    const managerChoices = managers.map((employees) => ({
        name: (`${employees.last_name}, ${employees.first_name}`),
        value: employees.id,
    }));

    console.log(managerChoices);

    

    const employeeArray = await inquirer.prompt([

        {
            message: "What is the last name of the new employee?",
            name: "lastName",
            type: "input",
        },
        {
            message: "What is the first name of the new employee?",
            name: "firstName",
            type: "input",
        },
        
        {
            message: "What is this employees role title?",
            name: "empRole",
            type: "list", 
            choices: roleChoices,

        },
        {
            message: "Who is this employee's manager?",
            name: "empManager",
            type: "list",
            choices: managerChoices,
        },
    ]);

    await db.query(
        `INSERT INTO employees (last_name, first_name, role_id, manager_id ) VALUES (?, ?, ?, ?)`,
        [employeeArray.lastName, employeeArray.firstName, employeeArray.empRole, employeeArray.empManager]
        );

        console.log("");
        console.log("New employee added.");
        console.log("");
        console.table(employeeTable);
};



// Removes an existing role
const removeEmployee = async () => {
    let employees = await employeesList();
    // console.log(roles);
    let employeeChoices = employees.map( (employees) => ({
        
        name: (`${employees.last_name} ${employees.first_name}`),
        value: employees.id,
        
    }));
    
    console.log(employeeChoices);
    
    const employessToDelete = await inquirer.prompt([
        {
        message: "Which employee would you like to remove?",
        name: "deletedEmployee",
        type: "list",
        choices: employeeChoices, 
        },
    ]);

    await db.query(
        `DELETE FROM employees WHERE id = ?`,
        employessToDelete.deletedEmployee
    );
    console.log("");
    console.log("Selected employee has been removed.");
    console.log("");
    
}


module.exports = { viewEmployees, createEmployee, removeEmployee };