import axios from 'axios';
import React, { useState } from 'react'
import './Login.css'

export default function Login() {

    const [loginDetails, setLoginDetails] = useState({
        Username: "",
        Password: "",
    });

    const handelChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        try {
            const response = await axios.get('https://atplc20.pythonanywhere.com/login', { loginDetails });
            console.log(response.data);
        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className='page login-page'>
            <div className="login-container">
                <div className="login-heading">
                    <h3>Login</h3>
                </div>
                <div className="login-inputs">
                    <div className="input-container">
                        <input type="text" id='username' value={loginDetails.Username} placeholder=' ' name='Username' onChange={handelChange} />
                        <label htmlFor="username">username / email</label>
                    </div>
                    <div className="input-container">
                        <input type="password" id='password' value={loginDetails.Password} placeholder=' ' name='Password' onChange={handelChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="login-button" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}
