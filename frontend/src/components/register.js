import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const bcrypt = require('bcryptjs')

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:    '',
            password: '',
            confirmPassword: '',
        };

    }

    // Update the state with the current value of the input
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit = event => {
        event.preventDefault();

        if(this.state.password === this.state.confirmPassword) {
            // Hash the password before sending the request
            const hashedPassword = bcrypt.hashSync(this.state.password, 10);

            const user = {
                name:     this.state.username,
                email:    this.state.email,
                password: hashedPassword
            };

            // TODO: REMOVE THIS DEBUG PRINT
            console.log(user)

            axios.post('http://localhost:3001/auth/register', {user})
            .then(res => {
                // TODO: implement login logic
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            document.getElementById('confirmPassword').setCustomValidity('Passwords must match');
        }
    }

    render() {
        return(
            <div className='registerContainer'>
                <h2>Create a new account</h2>
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
                    <label htmlFor='email'>Email: </label>
                    <br/>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        value={this.state.value}
                        onChange={this.handleChange}
                        autoComplete='email'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
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

                <section>
                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <br/>
                <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Password'
                    value={this.state.value}
                    onChange={this.handleChange}
                    autoComplete='new-password'
                    minLength='8'
                    required
                />
                </section>

                <button type='submit'>Create Account</button>
            </form>
        </div>
        )
    }
}

function Register() {
    return (
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <h1>Typing Game</h1>
            <div id="leftside"><br/></div>
            <div id='login'>
                <div class="box">
                    <RegisterForm />
                </div>
                <p>Already have an account? <Link class='link' to='/'>Click here</Link> to log in.</p>
            </div>
        </body>
    );
}

export default Register;