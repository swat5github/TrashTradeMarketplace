// Install necessary packages:
// npm install express body-parser mysql2

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database'
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

// Sign-up route to handle form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) throw err;
        res.send("User registered successfully!");
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});