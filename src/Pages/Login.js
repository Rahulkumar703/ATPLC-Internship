import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';

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

    const handelChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        });
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
                    <div className="message-box">
                        {error}
                    </div>
                }
                <div className="login-inputs">
                    <form action="" onSubmit={login}>
                        <Input icon={'fi fi-rr-portrait'} name='Username' value={loginDetails.Username} type='text' label='username' onChange={handelChange} required />
                        <Input icon={'fi fi-rr-lock'} name='Password' value={loginDetails.Password} type='password' label='password' onChange={handelChange} required />
                        <button className="login-button">
                            <div className="icon">
                                {
                                    isLoading ?
                                        <div className="loader animate-rotate">
                                            <i className="fi fi-rr-loading"></i>
                                        </div>
                                        :
                                        <i className="fi fi-rr-sign-in-alt"></i>
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
