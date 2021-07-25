USE employee;

INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", "50000", 2),
("Software Lead", 75000, 2),
("Project Manager", 100000, 2),
("Accountant", 48000, 3),
("Legal Team Lead", 76000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Scott", 2, NULL),
("Jan", "Levinson-Gould", 2, NULL),
("Pam", "Beasley", 2, NULL),
("Andy", "Bernard", 3, NULL);

-- INSERT INTO department (name) VALUES (?);

-- INSERT INTO role (department_id, title, salary) VALUES (?,?,?);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);