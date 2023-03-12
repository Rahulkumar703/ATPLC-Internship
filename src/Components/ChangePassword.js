import React, { useState } from 'react'
import axios from 'axios'
import './ChangePassword.css'

export default function ChangePassword() {


    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const changePassword = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const { data } = await axios.post('https://atplc20.pythonanywhere.com/change-password', {
                Username: JSON.parse(localStorage.getItem('user')).username,
                Password: newPassword
            })
            setMessage(data.Response);

        } catch (error) {
            setMessage(error);
        }
        finally {
            setIsLoading(false)
            setNewPassword('')
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
                <div className="row">
                    <div className="input-container">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                key
                            </span>
                        </div>
                        <input type="password" placeholder=' ' required id='password' onChange={(e) => { setNewPassword(e.target.value); setMessage('') }} />
                        <label htmlFor="password">New Password</label>
                    </div>
                    <button className="password-update-button" type='submit'>
                        {
                            isLoading &&
                            <span className="material-symbols-rounded">
                                donut_large
                            </span>

                        }
                        <div className="text">Update</div>
                    </button>
                </div>
            </form>
        </div>
    )
}
