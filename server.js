const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require("./utils/inputCheck")

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/employee", (req, res) => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    })
  })
});

// Get a single employee
app.get("/api/emplyee/:id", (req, res) => {
  const sql = `SELECT FROM * employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row
    })
  })
})

// Delete a candidate
app.delete("/api/emplyee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessdage(400).json({ error: res.message })
    } else if (!result.affectedRows) {
      res.json({
        message: "employee not found"
      })
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id
      })
    }
  })
})

app.post("/api/employee", ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "role_id", "manager_id");
  if (errors) {
    res.status(400).json({ error: errors })
    return;
}
const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?,?,?,?)`;
const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
db.query(sql, params, (err,result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: "success",
    data: body
  })
})
})

app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  // db.query(`SELECT * FROM departments`, (err, rows) => {
    //     console.log(rows)
    // })
  //   db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(row);
  // });
  //   db.query(`DELETE * FROM employees WHERE id = ?`, 1, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(result);
  // });

  // create an employee
  const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?,?)`;
  const params = [1, "Aunt", "Jemmima", 15, 07];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })


    db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.log(row);
  });

  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
