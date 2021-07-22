const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// create an employee don't know if this belongs!!!
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


router.get("/employee", (req, res) => {
  const sql = `SELECT employee.*, role.title
  AS role_name
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id`;

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

// Get a single employee
router.get("/emplyee/:id", (req, res) => {
  const sql = `SELECT employee.*, role.title
  AS role_name
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id
  WHERE employee.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});




router.post("/employee", ({ body }, res) => {
    const errors = inputCheck(
        body,
        "first_name",
        "last_name",
        "role_id",
        "manager_id"
        );
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
        const params = [
            body.first_name,
            body.last_name,
            body.role_id,
            body.manager_id,
        ];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: "success",
                data: body,
            });
        });
    });
    
    // update an employees role
    router.put("/employee/:id", (req, res) => {
        const errors = inputCheck(req.body, "role_id");
        if (errors) {
            res.status(400).json({ error: errors });
            return;
        }
        const sql = `UPDATE employee SET role_id = ?
        WHERE id = ?`;
        const params = [req.body.role_id, req.params.id];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                // check if a record was found
            } else if (!result.affectedRows) {
                res.json({
                    message: "employee not found",
                });
            } else {
                res.json({
                    messgae: "succuss",
                    data: req.body,
                    changes: result.affectedRows,
                });
            }
        });
    });

    // Delete a candidate
    router.delete("/emplyee/:id", (req, res) => {
        const sql = `DELETE FROM employee WHERE id = ?`;
        const params = [req.params.id];
        
        db.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessdage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: "employee not found",
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
    
    module.exports = router;