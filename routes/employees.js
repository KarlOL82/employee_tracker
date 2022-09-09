const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");
const {rolesList} = require("./roles");

db.query = utils.promisify(db.query);



const employeesList = async () => {

    

    const employeeData = await db.query(
        `SELECT employees.id, last_name, first_name, manager_id, role_id, departments.dept_name, roles.title, roles.salary
        FROM employees
        LEFT JOIN roles on employees.role_id = roles.id
        LEFT JOIN departments on department_id = departments.id
        `
    );
    return employeeData;
};




// Displays all current employees in the console
const viewEmployees = async () => {
    const employeeTable = await employeesList();
    
    console.log("\n");
    console.table(employeeTable);
    console.log("Use up or down keys to continue.");
}

// Creates a new employee and adds it to the database
const createEmployee = async () => {
    
    let roles = await db.query("SELECT id, title FROM roles");

    let roleChoices = roles.map( (roles) => ({
        name: roles.title,
        value: roles.id
    }));
    

    let managers = await employeesList();

    let managerChoices = managers.map((employees) => ({
        name: (`${employees.last_name}, ${employees.first_name}`),
        value: employees.id,
    }));

    

    

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
        // viewEmployees();
        
};

const updateRole = async () => {
    let roles = await db.query("SELECT id, title FROM roles");

    let roleChoices = roles.map( (roles) => ({
        name: roles.title,
        value: roles.id
}));

    const availableEmployees = await employeesList();

    const employeeToUpdate = availableEmployees.map( employees => ({
        name: (`${employees.last_name} ${employees.first_name}`),
        value: employees.id,
    }));

    const updateQuery = await inquirer.prompt([
        {
            message:"Which employee would you like to update?",
            name: "roleChange",
            type: "list",
            choices: employeeToUpdate,
        },
        {
            message: "What is this employee's new title?",
            name: "newRole",
            type: "list",
            choices: roleChoices,
        },
    ]);

    await db.query(
        `UPDATE employees
        SET role_id =?
        WHERE id = ?`,
        [updateQuery.newRole, updateQuery.roleChange]
    );

    console.log("");
    console.log(`Employee's role updated.`);
    console.log("");
    // viewEmployees();
};


// Removes an existing employee
const removeEmployee = async () => {
    let employees = await employeesList();
    // console.log(roles);
    let employeeChoices = employees.map( (employees) => ({
        
        name: (`${employees.last_name} ${employees.first_name}`),
        value: employees.id,
        
    }));
    
    
    
    const employeeToDelete = await inquirer.prompt([
        {
        message: "Which employee would you like to remove?",
        name: "deletedEmployee",
        type: "list",
        choices: employeeChoices, 
        },
    ]);

    await db.query(
        `DELETE FROM employees WHERE id = ?`,
        employeeToDelete.deletedEmployee
    );
    console.log("");
    console.log("Selected employee has been removed.");
    console.log("");
    // viewEmployees();
    
}


module.exports = { viewEmployees, createEmployee, removeEmployee, updateRole };