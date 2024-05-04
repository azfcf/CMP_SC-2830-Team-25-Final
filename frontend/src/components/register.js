import React from 'react';
import axios from 'axios';

const bcrypt = require('bcryptjs')

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:    '',
            password: '',
        };

    }

    // Update the state with the current value of the input
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
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
            console.log(res);
            console.log(res.data);
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} id='registrationForm'>

            <section>
                <label htmlFor='username'>Username: </label>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={this.state.value}
                    onChange={this.handleChange}
                    autoComplete='username'
                    required/>
            </section>

            <section>
                <label htmlFor='email'>Email: </label>
                <input
                    type='email'
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
            <input
                type='password'
                name='password'
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
        )
    }
}

function Register() {

    return (
        <div className='register-container'>
            <h1>Create an Account:</h1>
            <RegisterForm />
        </div>
    );
}

export default Register;