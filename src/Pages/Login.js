import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import userContext from '../Context/User/userContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/', { replace: true });
        }
    })

    const { userState, setUserState } = useContext(userContext);

    const [loginDetails, setLoginDetails] = useState({
        Username: "",
        Password: "",
    });
    const [error, seterror] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handelChange = (e, name) => {
        setLoginDetails({
            ...loginDetails,
            [name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        if (loginDetails.Username !== '' && loginDetails.Password !== '') {
            seterror('')
            setIsLoading(true);
            try {
                setIsLoading(true);
                const response = await axios.post('https://atplc20.pythonanywhere.com/login', { ...loginDetails, Username: loginDetails.Username.toUpperCase() });
                seterror(response.data.response);

                await setUserState({
                    ...userState,
                    userId: response.data.user_id[0].id,
                    username: loginDetails.Username,
                });

                localStorage.setItem('user', JSON.stringify({
                    userId: response.data.user_id[0].id,
                    username: loginDetails.Username.toUpperCase(),
                }));

                window.location.assign('/my-courses');

            } catch (err) {
                seterror(err?.response?.data?.response || err?.message);
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            seterror("All fields are mandatory")
        }
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
                    <form action="" onSubmit={login}>
                        <div className="input-container">
                            <div className="icon">
                                <span className="material-symbols-rounded">
                                    person
                                </span>
                            </div>
                            <input type="text" id='username' value={loginDetails.Username} placeholder=' ' onChange={(e) => handelChange(e, 'Username')} />
                            <label htmlFor="username">username / email</label>
                        </div>
                        <div className="input-container">
                            <div className="icon">
                                <span className="material-symbols-rounded">
                                    password
                                </span>
                            </div>
                            <input type="password" id='password' value={loginDetails.Password} placeholder=' ' onChange={(e) => handelChange(e, 'Password')} />
                            <label htmlFor="password">password</label>
                        </div>
                        <button className="login-button">
                            {
                                isLoading ?
                                    <div className="loader loading">
                                        <span className="material-symbols-rounded">
                                            donut_large
                                        </span>
                                    </div>
                                    :
                                    <div className="loader">
                                        <span className="material-symbols-rounded">
                                            send
                                        </span>
                                    </div>
                            }
                            <div className="text">Login</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
