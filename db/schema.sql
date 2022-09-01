DROP DATABASE IF EXISTS teamDirectory_db;

CREATE DATABASE teamDirectory_db;

USE teamDirectory_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_department (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE

);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    last_name VARCHAR(40) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY fk_role (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY fk_manager (manager_id)
    REFERENCES employees(id)


);

