const mysql = require('mysql2')

const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')
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

const pool = mysql.createPool({
    host:     'localhost',
    user:     'root',
    password: 'root', 
    database: 'typinggame', // subject to change
    port:     databasePort,
    rowsAsArray: true,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
})

app.get('/', (res) => {
    res.send('Hello world!');
})

const registerValidator = [
    body('user.username', 'Username field cannot be empty.').not().isEmpty(),
    body('user.username', 'Username must be between 2 and 40 characters long.').isLength({min: 2, max: 40}),
    body('user.username', 'Username cannot start with an underscore, period, or dash.').not().matches(/^[-_\.]/),
    body('user.username', 'Username may only contain alphanumeric characters, underscores, dashes, or periods.').matches(/^[A-Za-z\d-_\.]+$/),
    body('user.email', 'Email field cannot be empty.').not().isEmpty(),
    body('user.email', 'Email must be a valid email address.').isEmail(),
    body('user.password', 'Password field cannot be empty.').not().isEmpty(),
    body('user.password', 'Password must be between 8 and 72 characters in length').isLength({min: 8, max: 72}),
    
    // Check if the password is the same as the confirm password field
    body('user.password').custom((value, {req}) => {
        if(value !== req.body.user.confirmPassword) {
            throw new Error("Passwords must match.")
        } 
        return true;
    }),
    // Check if the username is already taken
    body('user.username').custom(async(value, {req}) => {
        members = await new Promise((resolve) => {
            pool.query('SELECT * FROM users WHERE username = ?', [value], (err, res) => {
                resolve(res)
            })
        })
        .then(res => {
            console.log(res);
            if(res.length != 0) {
                throw new Error("Username is already taken.");
            } else {
                return true;
            }
        });
    })
]

app.post('/auth/register', registerValidator, async (req, res) => {
    //console.log(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {

        // TODO: Implement register function
        const hashedPassword = bcrypt.hashSync(req.user.password, 10);
        res.send(req.body)
    }
    res.status(422).json({errors: errors.array()})



    
    
});

// Open the server
app.listen(serverPort, () => {
    console.log(`Backend server listening on port ${serverPort}`)
});