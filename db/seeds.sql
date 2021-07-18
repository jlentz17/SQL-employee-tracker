INSERT INTO department (id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Manager", "50000", "2"),
(2, "Software Lead", 75000, 2),
(3, "Project Manager", 100000, 2),
(4, "Accountant", 48000, 3),
(5, "Legal Team Lead", 76000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "Lars", "Finklestein", 3, 3),
(2, "Penelope", "Tate", 2, 1),
(3, "Rebecca", "Donaldson", 2, 4),
(4, "Frank", "Reynolds", 300, 5);