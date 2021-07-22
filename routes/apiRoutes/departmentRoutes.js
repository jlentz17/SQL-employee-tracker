const { json } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get("/department", (req, res) => {
    const sql = `SELECT FROM * department`;

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
})

// get a single department?? I'm switching up the variables and don't know how to apply the module to this
router.get("/department/:id", (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: row
        })
    })
})

router.post("/departemnt", ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, "name");
    if (errors) {
        res.status(400).json({ error: errors })
        return;
    }
    const sql = `INSERT INTO department (name) VALUES (?)`
    const params = [body.name]

    db.query(sql, params, (err, result) => {
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

router.put("/department", (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, "name");
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE department SET name = ? WHERE id = ?`
    const params = [req.body.name, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: "department not found"
            })
        } else {
            res.json({
                message: "success",
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})

router.delete("/department/:id", (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else {
            res.json({
                message: "deleted",
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    })
})

module.exports = router;