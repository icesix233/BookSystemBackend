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

app.post("/api/user/add", (req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const isManager = req.body.isManager;

    const sqlInsert = "INSERT INTO users (userName, userPassword, isManager) VALUES (?,?,?)";
    db.query(sqlInsert, [userName, userPassword, isManager], (err, result) => {
        console.log(result);
    })
})

app.post("/api/user/delete", (req, res) => {
    const userName = req.body.userName;

    const sqlDelete = "DELETE FROM users WHERE userName = ?";
    db.query(sqlDelete, [userName], (err, result) => {
        console.log(result);
    })
})

app.post("/api/user/update", (req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const isManager = req.body.isManager;

    const sqlUpdate = "UPDATE users SET userPassword = ?, isManager = ? WHERE userName = ?;";
    db.query(sqlUpdate, [userPassword, isManager, userName], (err, result) => {
        console.log(err);
    })
})

/* Book Sale Table API */
app.post("/api/sale/add", (req, res) => {
    const bookID = req.body.bookID;
    const userID = req.body.userID;
    const price = req.body.price;
    const time = req.body.time;
    const bookName = req.body.bookName;

    const sqlInsert = "INSERT INTO booksale (bookID, bookName, userID, price, time) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [bookID, bookName, userID, price, time], (err, result) => {
        console.log(result);
    })
})

app.get("/api/sale/get", (req,res) => {
    const sqlSelect = "SELECT * FROM booksale;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

// 获取销售额
app.get("/api/sale/getTotal", (req,res) => {
    const sqlSelect = "select sum(price) from booksale where id > 0;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

/* Book Rent Table API */
app.post("/api/rent/add", (req, res) => {
    const bookID = req.body.bookID;
    const bookName = req.body.bookName;
    const userID = req.body.userID;
    const price = req.body.price;
    const status = 2;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const sqlInsert = "INSERT INTO bookrent (bookID, bookName, userID, startTime, endTime, price, status) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [bookID, bookName, userID, startTime, endTime,price,status], (err, result) => {
        console.log(err);
    })
})

app.get("/api/rent/get", (req,res) => {
    const sqlSelect = "SELECT * FROM bookrent;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.listen(3022, () => {
    console.log("running on port 3022");
})