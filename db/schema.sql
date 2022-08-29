DROP DATABASE IF EXISTS teamDirectory_db;

CREATE DATABASE teamDirectory_db;

USE teamDirectory_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    last_name VARCHAR(40) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    manager VARCHAR(50),
    roles_id INT,
    title VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (roles_id),
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)


)