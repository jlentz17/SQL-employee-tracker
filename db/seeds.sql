USE employee;

INSERT INTO department (name)
VALUES
("Stamford"),
("Corporate"),
("Nashua"),
("Scranton");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", 100000, 1),
("Sales", 75000, 2),
("Warehouse", 120000, 3),
("Accountant", 69000, 4),
("Receptionist", 57000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Scott", 1, NULL),
("Jan", "Levinson-Gould", 3, NULL),
("Pam", "Beasley", 5, NULL),
("Andy", "Bernard", 2, NULL);

-- INSERT INTO department (name) VALUES (?);

-- INSERT INTO role (department_id, title, salary) VALUES (?,?,?);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);