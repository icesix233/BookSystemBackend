const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "booksys"
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

/* Book Table API */

app.get("/api/book/get", (req,res) => {
    const sqlSelect = "SELECT * FROM books;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/book/add", (req, res) => {
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookCategory = req.body.bookCategory;
    const bookDescription = req.body.bookDescription;
    const bookTime = req.body.bookTime;
    const bookOpr = req.body.bookOpr;

    const sqlInsert = "INSERT INTO books (bookName, bookAuthor, bookDescription, bookCategory, bookTime, bookOpretor) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [bookName, bookAuthor, bookDescription, bookCategory, bookTime, bookOpr], (err, result) => {
        console.log(result);
    })
})

app.post("/api/book/update", (req, res) => {
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookCategory = req.body.bookCategory;
    const bookDescription = req.body.bookDescription;
    const bookTime = req.body.bookTime;
    const bookOpr = req.body.bookOpr;

    const sqlUpdate = "UPDATE books SET bookAuthor = ?, bookCategory = ?, bookDescription = ?, bookTime = ?, bookOpretor = ? WHERE bookName = ?;";
    db.query(sqlUpdate, [bookAuthor, bookCategory, bookDescription, bookTime, bookOpr, bookName], (err, result) => {
        console.log(err);
    })
})

app.post("/api/book/delete", (req, res) => {
    const bookName = req.body.bookName;

    const sqlDelete = "DELETE FROM books WHERE bookName = ?";
    db.query(sqlDelete, [bookName], (err, result) => {
        console.log(result);
    })
})

/* User Table API */
app.get("/api/user/get", (req,res) => {
    const sqlSelect = "SELECT * FROM users;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.listen(3022, () => {
    console.log("running on port 3022");
})