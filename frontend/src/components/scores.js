import React from 'react';
import axios from 'axios';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
        }
    }

    componentDidMount() {
        var apiURL
        switch(this.props.leaderboardType){
            case 'top':
                apiURL = 'http://localhost:3001/api/scores/top'
                break;

            case 'recent':
                apiURL = 'http://localhost:3001/api/scores/recent'
                break;

            case 'user':
                apiURL = `http://localhost:3001/api/scores/user?id=${this.props.userId}`
                break;
        }


        axios.get(apiURL).then((data) => {
            this.setState({scores: data.data})
            console.log(data.data)
        });
        this.interval = setInterval(() => {
            axios.get(apiURL).then((data) => {
            this.setState({scores: data.data})
        })  
        }, 2500)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
            <>
                <h2>{this.props.label}</h2>
                <ol type='1'>

                    {this.state.scores.map(item => (
                        <li>Username: {item[0]}: WPM: {Math.round(item[1])}</li>
                    ))}
                </ol>
            </>
        )
    }
}

export default Leaderboard;