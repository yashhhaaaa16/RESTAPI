require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./db');
const cors = require('cors');

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.send("Welcome in REST API2");
});

app.get("/employees", (req, res, next) => {
    connection.query(`SELECT * FROM employees`, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});


app.delete("/employees/:empno", (req, res, next) => {
    connection.query(`DELETE FROM employees WHERE empno=${req.params.empno}`, (error, result) => {
        if (error) throw error;
        res.json("Employees deleted successfully");
    })
});

app.post("/employees", (req, res, next) => {
    const { name, salary, position, mode } = req.body;
    const sqlquery = "INSERT INTO employees (name,price,company,quantity) VALUES(?,?,?,?)";

    connection.query(sqlquery, [name, salary, position, mode], (error, result) => {
        if (error) throw error;
        res.json("Employee Added Successfully");
    })
});

app.put("/employees/:empno", (req, res, next) => {
    const { empno } = req.params;
    const { name, salary, position, mode } = req.body;
    const sqlquery = `UPDATE products SET name=?, salary=?, position=?, mode=? WHERE empno=${req.params.empno}`;

    connection.query(sqlquery, [name, salary, position, mode], (error, result) => {
        if (error) throw error;
        res.json("Employee Updated Successfully");
    })

});

app.listen(port, () => {
    console.log(`My Rest Api server started on ${host}:${port}`)
})