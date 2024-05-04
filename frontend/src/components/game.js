import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

function GameView(props) {
    const currentUser = props.currentUser;
    return (
        <div id="game">
            <p>currently logged in as {currentUser}</p>
            <p>Put game stuff here</p>
        </div>
    )
}

function LeaderboardView(props) {
    const currentUser = props.currentUser;
    return (
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
    )
}

function Game() {
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    function authenticate() {
        setIsLoggedIn(false);
        const headers = {
            'X-Auth': localStorage.getItem('token')
        }

        axios.post('http://localhost:3001/auth', null, { headers: headers })
        .then(res => {
            console.log("Authenticated successfully");
            setIsLoggedIn(true);
            setCurrentUser(res.data['username'])
        })
        .catch(error => {
            console.log(error);
            window.location.href = '/'
        })
    }

    useEffect(() => {
        authenticate()
    }, [])

    return (
        <div>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <h1>Typing Game</h1>
            <div>
            {isLoggedIn && <GameView currentUser={currentUser}/>}
            {isLoggedIn && <LeaderboardView />}
            </div>
        </div>
    )
}

export default Game;