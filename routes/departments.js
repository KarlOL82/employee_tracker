const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection");
const { type } = require("os");

db.query = utils.promisify(db.query);

const deptList = async () => {
    const deptData = await db.query(
        `SELECT id, dept_name FROM departments`
    );
    return deptData;
};

// Displays all current departments in the console
const viewDepartments = async () => {
    const deptTable = await deptList();

    console.table(deptTable);
}

// Creates a new department and adds it to the database
const createDepartment = async () => {

    let departments = await db.query("SELECT * FROM departments");

    console.table(departments);

    let departmentChoices = departments.map( departments => ({
        name: departments.dept_name,
        value: departments.id
    }));

    console.log(departmentChoices);

    const answers = await inquirer.prompt([

        {
            message: "What is the name of this department?",
            name: "deptName",
            type: "input", 

        },
    ]);

    await db.query(
        `INSERT INTO departments (dept_name) VALUES (?)`,
        answers.deptName
        );

        console.log("");
        console.log("New department added.");
        console.log("");
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
}


module.exports = { createDepartment, viewDepartments, removeDepartment };