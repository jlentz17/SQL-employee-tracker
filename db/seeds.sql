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
("Lars", "Finklestein", 2, NULL),
("Penelope", "Tate", 2, NULL),
("Rebecca", "Donaldson", 2, NULL),
("Frank", "Reynolds", 3, NULL);

-- INSERT INTO department (name) VALUES (?);

-- INSERT INTO role (department_id, title, salary) VALUES (?,?,?);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);