const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");
// const {askAgain, runTracker} = require("../server");

db.query = utils.promisify(db.query);

function askAgain() {
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
    }); 
};

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
    askAgain();
};

// Creates a new department and adds it to the database
const createDepartment = async () => {

    let departments = await db.query("SELECT * FROM departments");

    console.log("\n");
    console.table(departments);


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
    
};

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
  askAgain();
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
      
      askAgain();
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
  
  askAgain();
  
};

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
  askAgain();
};

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
      
      askAgain();
      
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
  
  askAgain();
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
  
  askAgain();
  
};

module.exports = {
  createDepartment,
  viewDepartments,
  removeDepartment,
  viewRoles,
  createRole,
  removeRole,
  viewEmployees,
  createEmployee,
  updateRole,
  removeEmployee,
};

