import React from 'react'
import './Login.css'

export default function Login() {

    const login = () => {
        console.log('logged in');
    }

    return (
        <div className='page login-page'>
            <div className="login-container">
                <div className="login-heading">
                    <h3>Login</h3>
                </div>
                <div className="login-inputs">
                    <div className="input-container">
                        <input type="text" id='username' placeholder=' ' />
                        <label htmlFor="username">username / email</label>
                    </div>
                    <div className="input-container">
                        <input type="password" id='password' placeholder=' ' />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="login-button" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}
