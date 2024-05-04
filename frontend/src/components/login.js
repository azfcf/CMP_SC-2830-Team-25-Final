import React, { useState } from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginErrors: []
        };

    }

    // Update the state with the current value of the input
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        this.setState({loginErrors: []})
        event.preventDefault();

        const user = {
            username:        this.state.username,
            password:        this.state.password
        };

        // Send the POST request
        axios.post('http://localhost:3001/auth/login', {user})
        .then(res => {
            localStorage.setItem("token", res.data.token);
            window.location.href = '/game'
        })
        .catch(error => {
            this.setState({loginErrors: [{msg: 'Invalid username/password combination.'}]})
            
            console.log(this.loginErrors)
            console.log(error);
        })
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit} id='loginForm'>
        <div>
            {this.state.loginErrors.map(item => (
                <p class="loginError">{item.msg}</p>
            ))}
        </div>
        <section>
            <label htmlFor='username'>Username: </label>
            <br/>
            <input
                type='text'
                id='text'
                name='username'
                placeholder='Username'
                value={this.state.value}
                onChange={this.handleChange}
                autoComplete='username'
                required/>
        </section>

        <section>
        <label htmlFor='password'>Password: </label>
        <br/>
        <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete='new-password'
            minLength='8'
            required
        />
        </section>

        <button type='submit'>Log in</button>
    </form>
        )
    }
}
function Login() {
    return (
        <div className='loginContainer'>
            <h2>Log in to an existing account</h2>
            <LoginForm />
    </div>  
    );
}

export default Login;