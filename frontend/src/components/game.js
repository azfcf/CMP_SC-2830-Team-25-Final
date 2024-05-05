import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

function GameView(props) {

    function deleteToken() {
        localStorage.removeItem("token");
    }

    const currentUser = props.currentUser;
    const currentUserId = props.currentUserId;
    return (
        <div id="game">
            <p>Currently logged in as {currentUser}. <Link class='link' to='/' onClick={deleteToken}>Log out</Link></p>
            <GameHandler currentUser={currentUser} currentUserId={currentUserId} />
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
            passageID: '',
            lastTypedPosition: 0,
            charactersTyped: 0,
            correctCharactersTyped: 0,
            typingError: false,
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
            console.log("new passage")
            var response = data.data[0]
            this.setState({passageText: response[1]})
            this.setState({passageID: response[0]})
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
            }
        } else {
            this.setState({typingError: true})
            if(this.state.lastTypedPosition < currentPos) {
                this.setState({errorCount: this.state.errorCount + 1})
                this.setState({charactersTyped: this.state.charactersTyped + 1})
            } 
        }
    }
    componentDidUpdate(prevState, prevProps) {
        
        if(this.state.isComplete) {
            console.log(`DONE \n ${this.state.passageText}\n${this.state.endTime}\n${this.state.startTime}`)
            const score = {
                user_id: this.props.currentUserId,
                text_id: this.state.passageID,
                wpm: (this.state.passageText + '').length / 5 * (60 / ((Date.parse(this.state.endTime) - Date.parse(this.state.startTime)) / 1000)),
                accuracy: (this.state.correctCharactersTyped / this.state.charactersTyped),
                date_submitted: this.state.endTime.slice(0, 19).replace('T', ' ')
            }

            axios.post('http://localhost:3001/api/send-score', { score })
            .then(res => {
                console.log("Score submitted")
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    newGame = event => {
        this.getPassage();
        this.setState({
            isTyping: false,
            currentText: '',
            lastTypedPosition: 0,
            charactersTyped: 0,
            correctCharactersTyped: 0,
            typingError: false,
            errorCount: 0,
            startTime: '',
            endTime: '',
            wpm: 0.0,
            isComplete: false
        })
    }

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
                    <p>{this.state.wpm ? Math.round(this.state.wpm) : 0} WPM, {Math.round(this.state.correctCharactersTyped/this.state.charactersTyped * 100)}% accuracy ({this.state.errorCount} errors)</p>
                    {this.state.isComplete ? <button onClick={this.newGame}>Play again</button> : ''}
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