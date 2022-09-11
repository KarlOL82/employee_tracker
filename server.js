const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const connection = require("../employee_tracker/helpers/connectipn")
const utils = require("util");
const { db } = require("../employee_tracker/helpers/connection");

const {runTracker} = require("../employee_tracker/routes/question");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

runTracker();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

