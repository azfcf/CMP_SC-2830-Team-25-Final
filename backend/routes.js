const express = require('express');
const router = express.Router();

//MySQL connection setup
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'typinggame'
});

connection.connect(err => { 
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL server.');
});

router.get(' /api/scores/recent', (req, res) => {
  const query = '
    SELECT users.username, scores.cpm, scores.wpm, scores.date_submitted
    FROM scores
    JOIN users ON scores.user_id = users.id
    ORDER BY scores.date_submitted DESC
    LIMIT 10;
  ;
  connection.query(query, (err, results) => {
    if (err) {
        console.error('Error fetching recent scores:', err);
        res.status(500).json({error:'Internal Server Error'});
        return;
    }
    res.json(results);
  });
});

module.exports = router;
