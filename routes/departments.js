const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require('util');
const { db } = require("../helpers/connection")

db.query = utils.promisify(db.query);

const deptList = async () => {
    const deptData = await db.query(
        `SELECT id, dept_name FROM departments`
    );
    return deptData;
};

const viewDepartments = async () => {
    const deptTable = await deptList();

    console.table(deptTable);
}

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
        `INSERT INTO departments (dept_name) VALUES (?)`,
        answers.deptName
        );

        console.log("");
        console.log("New department added.");
        console.log("");
};

module.exports = { createDepartment, viewDepartments };