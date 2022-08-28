DROP DATABASE IF EXISTS teamDirectory_db;

CREATE DATABASE teamDirectory_db;

USE teamDirectory_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);