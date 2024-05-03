const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const app = express()

app.use(express.json);
app.use(cors());

// Create the database connection
const conn = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "root", 
    database: "typinggame", // subject to change
    port:     3306
});

conn.connect(function(err) {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
    else {
        console.log("Connection established");
    }
});