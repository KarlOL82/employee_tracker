const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require("util");

const {runTracker} = require("../employee_tracker/routes/question");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

runTracker();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const {
//   createDepartment,
//   viewDepartments,
//   removeDepartment,
// } = require("./routes/departments");

// const { viewRoles, createRole, removeRole } = require("./routes/roles");

// const {
//   viewEmployees,
//   createEmployee,
//   updateRole,
//   removeEmployee,
// } = require("./routes/employees");



// const { runTracker } = require("../employee_tracker/routes/question");
// const {
//   topMenuQs,
//   departmentOptions,
//   roleOptions,
//   employeeOptions,
//



// async function runTracker() {


//   const menuChoices = await inquirer.prompt([
//     {
//       message: "What area would you like to access?",
//       name: "topMenu",
//       type: "list",
//       choices: topMenuQs,
//     },
//   ]);

//   if (menuChoices.topMenu === "exit") {
//     console.log("Session Ended.");
//   } else {
//     runTracker[menuChoices.topMenu]();
//   }
// }

//  function runTracker() {
//   inquirer
//     .prompt([
//       {
//         message: "What area would you like to access?",
//         name: "selection",
//         type: "list",
//         choices: [
//           "View Departments",
//           "Add New Department",
//           "Remove Department",
//           "View All Roles",
//           "Add New Role",
//           "Remove Role",
//           "View All Emoloyees",
//           "Add New Employee",
//           "Update Employee Role",
//           "Remove Employee",
//           "Exit Program",
//         ],
//       },
//     ])
//     .then((answer) => {
//       switch (answer.selection) {
//         case "View Departments":
//           viewDepartments();
//           break;
//         case "Add New Department":
//           createDepartment();
//           break;
//         case "Remove Department":
//           removeDepartment();
//           break;
//         case "View All Roles":
//           viewRoles();
//           break;
//         case "Add New Role":
//           createRole();
//           break;
//         case "Remove Role":
//           removeRole();
//           break;
//         case "View All Emoloyees":
//           viewEmployees();
//           break;
//         case "Add New Employee":
//           createEmployee();
//           break;
//         case "Update Employee Role":
//           updateRole();
//           break;
//         case "Remove Employee":
//           removeEmployee();
//           break;
//         case "Exit Program":
//           process.exit();
//           break;
//         default:
//           console.log("Invalid Entry");
//           break;
//       }
//     });
// };








