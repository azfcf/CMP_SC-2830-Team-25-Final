import React from 'react';
import './home.css';

function Game() {
  return (
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <h1>Typing Game</h1>
    <div id="game">
      <p>Put game stuff here</p>
    </div>
    <div id="leaderboard">
      <h2>Your top 10 scores</h2> {/* top scores specifically for the user that is logged in */} 
      <ol type="1">
        {/* make these interact with the database - I just have this in now as a placeholder */}
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
      </ol>
      <h2>Top 10 scores all-time</h2>
      <ol type="1">
        {/* make these interact with the database - I just have this in now as a placeholder */}
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
      </ol>
      <h2>Most recent scores</h2>
      <ol type="1">
        {/* make these interact with the database - I just have this in now as a placeholder */}
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
        <li>Username: Score</li>
      </ol>
    </div>
  </body>
  )
}

export default Game;