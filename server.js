const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cTable = require("console.table");
const mysql = require("mysql2");
const { prompt } = require("inquirer");
// const apiRoutes = require("./routes/apiRoutes");

const inputCheck = require("./utils/inputCheck");
// // middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // use api routes
// app.use("/api", apiRoutes);

function menuQuestions() {
  prompt([
    {
      type: "list",
      message: "What would you like to do??",
      name: "list",
      choices: [
        "View ALL Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employees",
        "Update Employee Role",
        "Quit",
      ],
    },
  ]).then((answers) => {
    if (answers === "View All Departments") {
      viewAllDepartments();
    } else if (answers.list === "View All Roles") {
      viewAllRoles();
    } else if (answers.list === "View All Employees") {
      viewAllEmployees();
    } else if (answers.list === "Add Department") {
      addDepartment();
    } else if (answers.list === "Add Role") {
      addRole();
    } else if (answers.list === "Add Employee") {
      addEmployee();
    } else if (answers.list === "Update Employee Role") {
      updateEmployeeRole();
    } else if (answers.list === "Quit") {
      connection.end();
    }
  });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    menuQuestions();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT role.title, role.salary, department.name FROM role LEFT JOIN depeartment ON role.department_id = department.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      menuQuestions();
    }
  );
}

function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name AS 'manager_firstname', manager.last_name AS 'manager_lastname' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manger.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      menuQuestions();
    }
  );
}

function addDepartment() {
  prompt([
    {
      name: "department_name",
      type: "input",
      message: "What is the name of the department you'd like to add?",
    },
  ]).then(function (answer) {
    db.query("INSERT INTO department SET ?", [answer], function (err) {
      if (err) throw err;
      console.log("Success");
      menuQuestions();
    });
  });
}

function addRole() {
  prompt([
    {
      name: "role_name",
      type: "input",
      message: "What is the name of the role you'd like to add?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    },
    {
      name: "department_id",
      type: "number",
      message: "What is the department id for this role?",
    },
  ]).then(function (answer) {
    db.query("INSERT INTO role SET ?", [answer], function (err) {
      if (err) throw err;
      console.log("Success");
      menuQuestions();
    });
  });
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee you'd like to add?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the last name of the employee you'd like to add?",
    },
    {
      name: "role_id",
      type: "number",
      message: "What is the role id for this employee?",
    },
    {
      name: "manager_id",
      type: "number",
      message: "What is the manager id for this employee?",
    },
  ]).then(function (answer) {
    db.query("INSERT INTO employee SET ?", [answer], function (err) {
      if (err) throw err;
      console.log("Success");
      menuQuestions();
    });
  });
}

function deleteDepartment() {
  prompt([
    {
      type: "number",
      name: "id",
      message: "Enter employee id to delete"
    }
  ]).then(answers => {
    db.query("DELETE FROM employee WHERE ?", {
      id: answers.id
    },
    function(err, res) {
      if (err) throw err;
        console.log(res.affectedRows + "Deleted employee!\n");
        menuQuestions();
    })
  })
}


function deleteRole() {
  prompt([
    {
      type: "number",
      name: "id",
      message: "Enter role id to delete"
    }
  ]).then(answers => {
    db.query("DELETE FROM role WHERE ?", {
      id: answers.id
    },
    function(err, res) {
      if (err) throw err;
        console.log(res.affectedRows + "Deleted role!\n");
        menuQuestions();
    })
  })
}


function deleteEmployee() {
  prompt([
    {
      type: "number",
      name: "id",
      message: "Enter employee id to delete"
    }
  ]).then(answers => {
    db.query("DELETE FROM employee WHERE ?", {
      id: answers.id
    },
    function(err, res) {
      if (err) throw err;
        console.log(res.affectedRows + "Deleted employee!\n");
        menuQuestions();
    })
  })
}

// default response for any other request not found (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
