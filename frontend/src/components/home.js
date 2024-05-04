import React from 'react';
import Register from './register'
import './home.css';

function Home() {
  return (
    
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <h1>Typing Game</h1>
    <div id="leftside"><br/></div> {/* to shift over the login view in the middle so it's centered */}
    <div id="login">
      <h2>Log in</h2>
      <p>Please log in or create an account to continue.</p>
      <div class="box">
        <form method="post">
          <h2>Log in to an existing account</h2>
          <label for="username">Username</label>
          <br/>
          <input type="text" placeholder="Username" name="username" required/>
          <br/>
          <label for="password">Password</label>
          <br/>
          <input type="password" placeholder="Password" name="password" required/>
          <br/>
          <button type="submit">Log in</button>
        </form>
      </div>
      <br/>
      <div class="box">
        <Register />
      </div>
    </div>
    <div id="leaderboard">
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

  );
}

export default Home;