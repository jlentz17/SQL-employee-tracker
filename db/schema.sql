
-- DROP TABLE IF EXISTS 
DROP DATABASE IF EXISTS employee;

-- Create database --
CREATE DATABASE employee;

-- start using database
USE employee;

-- Create table "department" 
CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create table "role" 
CREATE TABLE role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE CASCADE
);

-- Create table "role" 
CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id)
    REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER
-- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);