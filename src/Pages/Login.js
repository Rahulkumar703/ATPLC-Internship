import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();


    const [error, seterror] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        Username: "",
        Password: "",
    });



    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.userId !== undefined) {
            navigate('/login', { replace: true });
        }
    }, [navigate])

    const handelChange = (e, name) => {
        setLoginDetails({
            ...loginDetails,
            [name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        if (loginDetails.Username !== '' && loginDetails.Password !== '') {
            try {
                setIsLoading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/login`, {
                    Password: loginDetails.Password,
                    Username: loginDetails.Username.toUpperCase()
                });


                localStorage.setItem('user', JSON.stringify({
                    userId: data.user_id[0].id,
                    username: loginDetails.Username.toUpperCase(),
                    fullName: data.user_id[0].first_name,
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
                                <i class="fi fi-rr-portrait"></i>
                            </div>
                            <input type="text" id='username' value={loginDetails.Username} placeholder=' ' onChange={(e) => handelChange(e, 'Username')} />
                            <label htmlFor="username">username</label>
                        </div>
                        <div className="input-container">
                            <div className="icon">
                                <i class="fi fi-rr-lock"></i>
                            </div>
                            <input type="password" id='password' value={loginDetails.Password} placeholder=' ' onChange={(e) => handelChange(e, 'Password')} />
                            <label htmlFor="password">password</label>
                        </div>
                        <button className="login-button">
                            <div className="icon">
                                {
                                    isLoading ?
                                        <div className="loader animate-rotate">
                                            <i className="fi fi-rr-loading"></i>
                                        </div>
                                        :
                                        <i class="fi fi-rr-sign-in-alt"></i>
                                }
                            </div>
                            <div className="text">Login</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
