import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

function GameView(props) {
    const currentUser = props.currentUser;
    return (
        <div id="game">
            <p>Currently logged in as {currentUser}. <Link class='link' to='/'>Log out</Link></p>
            <GameHandler />
        </div>
    )
}

function LeaderboardView(props) {
    const currentUser = props.currentUser;
    const currentUserId = props.currentUserId;

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

class GameHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            isTyping: false,
            currentText: '',
            passageText: '',
            lastTypedPosition: 0,
            charactersTyped: 0,
            correctCharactersTyped: 0,
            typingError: false,
            currentTime: '',
            errorCount: 0,
            startTime: '',
            endTime: '',
            wpm: 0.0,
            isComplete: false
        }
    }
    //new Date().toISOString().slice(0, 19).replace('T', ' ')
    getPassage = event => {
        axios.get('http://localhost:3001/game/game-passage').then((data) => {
            this.setState({passageText: data.data})
            this.setState({isPlaying: true})
        })  
    }
    handleChange = event => {
        if(!this.state.isTyping) {
            this.setState({isTyping: true})
            this.setState({startTime: new Date().toISOString()})
        }

        const currentPos = event.target.value.length
        this.setState({currentText: event.target.value, lastTypedPosition: currentPos})
        
        var compareString = (this.state.passageText + '').slice(0, currentPos);
        if(compareString == event.target.value) {
            this.setState({typingError: false})
            this.setState({charactersTyped: this.state.charactersTyped + 1})
            this.setState({correctCharactersTyped: this.state.correctCharactersTyped + 1})

            if((this.state.passageText + '').length == currentPos) {
                let endTime = new Date().toISOString()
                this.setState({endTime: endTime})
                this.setState({isComplete: true})

                let date1 = Date.parse(this.state.startTime)
                let date2 = Date.parse(endTime)
            }
        } else {
            this.setState({typingError: true})
            if(this.state.lastTypedPosition < currentPos) {
                this.setState({errorCount: this.state.errorCount + 1})
                this.setState({charactersTyped: this.state.charactersTyped + 1})
            } 
        }
    }

    // sendScore() {
    //     useEffect(() => {
    //         const score = {

    //         }
    //     }, [this.state.isComplete])
    // }

    componentDidMount() {
        this.interval = setInterval(() => {
            if(!this.state.isComplete) {
                this.setState({wpm: this.state.correctCharactersTyped/5 * (60 / ((new Date() - Date.parse(this.state.startTime)) / 1000))})
            }
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {

        return (
            <div class="box">
                {/* If the player is currently playing, then display the text area and the prompt */}
                { this.state.isPlaying ? <div>
                    <p>Text to type:<br/>
                        <span id="passage">{this.state.passageText}</span></p> 
                    <textarea value={this.state.currentText} onChange={this.handleChange} disabled={this.state.isComplete}>
                    </textarea>
                    {this.state.typingError ? <div><p id="error">ERROR</p></div> : ''}
                    <p>{this.state.wpm ? Math.round(this.state.wpm) : 0} WPM, {Math.round((1 - this.state.errorCount / this.state.charactersTyped) * 100)}% accuracy ({this.state.errorCount} errors)</p>
                </div>
                : <button onClick={this.getPassage}>Play!</button>}
            </div>
        )
    }
}   

function Game() {
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

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
            setCurrentUserId(res.data['id'])
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
            {isLoggedIn && <GameView currentUser={currentUser} currentUserId={currentUserId} />}
            {isLoggedIn && <LeaderboardView />}
            </div>
        </div>
    )
}

export default Game;