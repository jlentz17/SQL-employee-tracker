USE employee;

INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", "50000", "2"),
("Software Lead", 75000, 2),
("Project Manager", 100000, 2),
("Accountant", 48000, 3),
("Legal Team Lead", 76000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Lars", "Finklestein", 3, 3),
("Penelope", "Tate", 2, 1),
("Rebecca", "Donaldson", 2, 4),
("Frank", "Reynolds", 3, 5);