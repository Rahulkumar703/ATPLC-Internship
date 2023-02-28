import axios from 'axios';
import React, { useContext, useState } from 'react'
import './Login.css'
import userContext from '../Context/User/userContext';
import { useLocation } from 'react-router-dom';

export default function Login() {

    const { userState, setUserState } = useContext(userContext)
    const location = useLocation();

    const [loginDetails, setLoginDetails] = useState({
        Username: "",
        Password: "",
    });
    const [error, seterror] = useState('Fill All Fields');
    const [isLoading, setIsLoading] = useState(false);

    const handelChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        if (loginDetails.Username !== '' && loginDetails.Password !== '') {
            seterror('')
            setIsLoading(true);
            try {
                setIsLoading(true);
                const response = await axios.post('https://atplc20.pythonanywhere.com/login', loginDetails);
                seterror(response.data.response);

                await setUserState({
                    ...userState,
                    userId: response.data.user_id[0].id,
                    username: loginDetails.Username,
                });

                localStorage.setItem('user', JSON.stringify({
                    userId: response.data.user_id[0].id,
                    username: loginDetails.Username,
                }));

                window.location.assign('/dashboard');

            } catch (err) {
                seterror(err.response.data.response);
            }
        }
        else {
            seterror("Fill All Details")
        }
        setIsLoading(false);
    }

    return (
        <div className='page login-page'>
            <div className="login-container">
                <div className="login-heading">
                    <h3>Login</h3>
                </div>
                {
                    error !== '' &&
                    <div className="error-messages">
                        {error}
                    </div>
                }
                <div className="login-inputs">
                    <div className="input-container">
                        <input type="text" id='username' value={loginDetails.Username} placeholder=' ' name='Username' onChange={handelChange} />
                        <label htmlFor="username">username / email</label>
                    </div>
                    <div className="input-container">
                        <input type="password" id='password' value={loginDetails.Password} placeholder=' ' name='Password' onChange={handelChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="login-button" onClick={login}>
                        {
                            isLoading &&
                            <div className="loader">
                                <span className="material-symbols-rounded">
                                    hourglass_empty
                                </span>
                            </div>
                        }
                        <div className="text">Login</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
