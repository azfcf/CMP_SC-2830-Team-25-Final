import React from 'react';
import { Link } from 'react-router-dom';

import Login from './login';
import Leaderboard from './scores'
import './home.css';

function Home() {
  return (
    
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <h1>Typing Game</h1>
    <div id='leftside'><br/></div> {/* to shift over the login view in the middle so it's centered */}
    <div id='login'>
      <h2>Log in</h2>
      <p>Please log in or <Link class='link' to='/register'>create an account</Link> to continue.</p>
      <div class='box'>
        <Login />
      </div>
    </div>
    <div id='leaderboard'>
        <Leaderboard label='Top 10 scores all-time' leaderboardType='top' />
        <Leaderboard label='Most recent scores' leaderboardType='recent'/>
    </div>
  </body>

  );
}

export default Home;