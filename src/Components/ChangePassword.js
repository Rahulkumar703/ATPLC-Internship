import React, { useState } from 'react'
import axios from 'axios'
import './ChangePassword.css'

export default function ChangePassword() {


    const [Password, setPassword] = useState(
        {
            old: '',
            new: '',
            confirm: ''
        }
    );
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const changePassword = async (e) => {
        e.preventDefault();
        if (Password.new === Password.confirm) {
            try {
                setIsLoading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/change-password`, {
                    Username: JSON.parse(localStorage.getItem('user')).username,
                    Password: Password.new,
                    Old_Password: Password.old
                })
                setMessage(data.Response);

            } catch (error) {
                setMessage(error);
            }
            finally {
                setIsLoading(false)
                setPassword({
                    old: '',
                    new: '',
                    confirm: ''
                })
            }
        }
        else {
            setMessage('Passwords not matched')
        }


    }
    return (
        <div className="password-field">
            <div className="field-heading">
                <h4>Change Password</h4>
            </div>
            <form className='field-body' onSubmit={changePassword}>
                {
                    message !== '' &&
                    <div className="message-box">
                        {message}
                    </div>
                }
                <div className="col">

                    <div className="input-container">
                        <div className="icon">
                            <i className="fi fi-rr-lock"></i>
                        </div>
                        <input type="password" placeholder=' ' required id='old-password' onChange={(e) => { setPassword({ ...Password, old: e.target.value }); setMessage('') }} />
                        <label htmlFor="old-password">Old Password</label>
                    </div>

                    <div className="input-container">
                        <div className="icon">
                            <i className="fi fi-rr-key"></i>
                        </div>
                        <input type="password" placeholder=' ' required id='new-password' autoComplete='off' onChange={(e) => { setPassword({ ...Password, new: e.target.value }); setMessage('') }} />
                        <label htmlFor="new-password">New Password</label>
                    </div>

                    <div className="input-container">
                        <div className="icon">
                            <i className="fi fi-rr-key"></i>
                        </div>
                        <input type="password" placeholder=' ' required id='confirm-new-password' autoComplete='off' onChange={(e) => { setPassword({ ...Password, confirm: e.target.value }); setMessage('') }} />
                        <label htmlFor="confirm-new-password">Confirm New Password</label>
                    </div>

                    <button className="password-update-button" type='submit'>
                        <div className="icon">
                            {
                                isLoading ?
                                    <div className="loader animate-rotate">
                                        <i className="fi fi-rr-loading"></i>
                                    </div>
                                    :
                                    <i className="fi fi-rr-refresh"></i>
                            }
                        </div>
                        <div className="text">Update</div>
                    </button>
                </div>
            </form>
        </div>
    )
}
