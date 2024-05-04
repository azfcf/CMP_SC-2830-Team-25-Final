import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:    '',
            password: '',
            confirmPassword: '',
            registerSuccessful: false,
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
            email:           this.state.email,
            password:        this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        // Send the POST request
        axios.post('http://localhost:3001/auth/register', {user})
        .then(res => {
            console.log(res);
            this.setState({registerSuccessful: true})
        })
        .catch(error => {
            this.setState({loginErrors: error.response.data.errors})
            console.log(this.loginErrors)
            console.log(error);
        })
    }

    render() {
        return(
            <div className='registerContainer'>
                <h2>Create a new account</h2>
                <form onSubmit={this.handleSubmit} id='registrationForm'>
                <div>
                    {this.state.registerSuccessful ? <p class='registerSuccessful'>Registration successful! <Link class='link' to='/'>Click here</Link> to go to the login page.</p> : ''}
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
                    <label htmlFor='email'>Email: </label>
                    <br/>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        placeholder='Email'
                        value={this.state.value}
                        onChange={this.handleChange}
                        autoComplete='email'
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