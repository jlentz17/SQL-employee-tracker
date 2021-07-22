const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require("./utils/inputCheck");
const apiRoutes = rquire("./routes/apiRoutes");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/role", (req, res) => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/role/:id", (req, res) => {
  const sql = `SELECT * FROM role WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.delete("/api/role/:id", (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "role not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Update an employee's role


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
      console.log(err);
    }
    console.log(result);
  });

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
