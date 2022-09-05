const express = require("express");
const mysql = require("mysql2");
const { default: inquirer } = require("inquirer");
const utils = require('util');

// db.query = utils.promisify(db.query);


const createDepartment = async () => {

    const departments = await db.query("SELECT * FROM departments");

    console.table(departments);

    const departmentChoices = departments.map( departments => ({
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
        "INSERT INTO departments (id, dept_name) VALUES (?, ?)",
        [departments.id, answers.dept_name]
        )
};

module.exports = {createDepartment};