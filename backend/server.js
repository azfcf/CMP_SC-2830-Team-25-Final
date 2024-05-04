const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')

const app = express()

app.use(express.json());
app.use(express.urlencoded( { extended: false }))
app.use(cors());

const serverPort = 3001
const databasePort = 3306

const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Create the database connection
const conn = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root', 
    database: 'typinggame', // subject to change
    port:     databasePort
});

// Attempt to connect to the database
conn.connect(function(err) {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    }
    else {
        console.log('Connection established');
    }
});

app.get('/', (res) => {
    res.send('Hello world!');
})

app.post('/auth/register', async (req, res) => {
    res.send(req.body);
});

// Open the server
app.listen(serverPort, () => {
    console.log(`Backend server listening on port ${serverPort}`)
});