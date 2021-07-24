
-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS role;
-- DROP TABLE IF EXISTS employee;

DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;
USE employee;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER NOT NULL,
FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INTEGER,
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, manager.first_name AS manager_first_name, manager.last_name AS manager_lastname FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;

SELECT role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id