import React, { useState } from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

    }

    // Update the state with the current value of the input
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit} id='registrationForm'>

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
        <div className='login-container'>
            <h2>Log in to an existing account</h2>
            <LoginForm />
    </div>  
    );
}

export default Login;