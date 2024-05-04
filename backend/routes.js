const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'typinggame'
});

connection.getConnection(err => { 
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL server using a connection pool.');
});

router.get('/api/scores/recent', async (req, res) => {
  const query = `
    SELECT users.username, scores.cpm, scores.wpm, scores.date_submitted
    FROM scores
    JOIN users ON scores.user_id = users.id
    ORDER BY scores.date_submitted DESC
    LIMIT 10;
  `;
  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error('Error fetching recent scores:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
