const db = require("./db/connection");
const cTable = require("console.table");
const mysql = require("mysql2");
const { prompt } = require("inquirer");
// const apiRoutes = require("./routes/apiRoutes");
// // middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// // use api routes
// app.use("/api", apiRoutes);

function menuQuestions() {
  console.log(`
  =============================
  
        EMPLOYEE TRACKER!!

  =============================    
  `)
  prompt([
    {
      type: "list",
      message: "What would you like to do??",
      name: "list",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit"
      ],
    },
  ]).then((answers) => {
    if (answers.list === "View All Departments") {
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
    } else if (answers.list === "Delete Department") {
      deleteDepartment();
    } else if (answers.list === "Delete Role") {
      deleteRole();
    } else if (answers.list === "Delete Employee") {
      deleteEmployee();
    } else if (answers.list === "Quit") {
      db.end();
    }
  });
}

function viewAllDepartments() {
  console.log(`
  =============================
           DEPARTMENTS!!
  =============================          
  `)
  const sql = `SELECT * FROM department`
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    menuQuestions();
  });
}

function viewAllRoles() {
  console.log(`
  =============================
            ROLES!!
  =============================
  `)
  const sql = `SELECT role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id`
  db.query(
    sql,
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
      menuQuestions();
    }
  );
}

function viewAllEmployees() {
  console.log(`
  ============================
           EMPLOYEES!!
  ============================        
  `)
  const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name AS 'manager_firstname', manager.last_name AS 'manager_lastname' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`
  db.query(
    sql,
    (err, rows) => {
      if (err) throw err;
      console.table(rows);
      menuQuestions();
    }
  );
}

function addDepartment() {
  prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of the department you'd like to add?",
    },
  ]).then(function (answer) {
    db.query("INSERT INTO department SET ?", [answer], function (err) {
      if (err) throw err;
      console.log(`
      =============================
           DEPARTMENT ADDED!!
      ============================= 
      `);
      menuQuestions();
    });
  });
}

function addRole() {
  prompt([
    {
      name: "title",
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
      console.log(`
      ==========================
      ADDED ROLE SUCCESSFULLY!!
      ==========================
      `);
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
      console.log(`
      ==============================
      ADDED EMPLOYEE SUCCESSFULLY!!
      ==============================
      `);
      menuQuestions();
    });
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, res) => {
    const employees = res.map(updatedRole => {
      return (
        {
          name: updatedRole.first_name + " " + updatedRole.last_name,
          value: updatedRole.id
        }
      )
    })
    db.query("SELECT * FROM role", (err, res) => {
      const roles = res.map(updatedRole => {
        return (
          {
            name: updatedRole.title,
            value: updatedRole.id
          }
        )
      })
      console.log(roles)
  prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to change",
      choices: employees
    },
    {
      type: "list",
      name: "role",
      messages: "What's the new role id you'd like to assign to the employee?",
      choices: roles
    }
  ]).then(answers => {
    db.query(`UPDATE employee SET role_id = '${answers.role}' WHERE id = '${answers.employee}'`,
    function (err, res) {
      if (err) throw err;
      console.log(`
      ========================
        EMPLOYEE ROLE UPDATED
      ========================`, res);
      menuQuestions();
    });
    });
  });
})
}


function deleteDepartment() {
  prompt([
    {
      type: "number",
      name: "id",
      message: "Enter department id to delete"
    }
  ]).then(answers => {
    db.query("DELETE FROM department WHERE ?", {
      id: answers.id
    },
    function(err, res) {
      if (err) throw err;
        console.log(`
        ==========================
            DEPARTMENT DELETED!!
        ==========================`);
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
        console.log(`
        ==========================
               ROLE DELETED!!
        ==========================`);
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
        console.log(`
        ============================
             EMPLOYEE DELETED
        ============================`);
        menuQuestions();
    })
  })
}

menuQuestions();