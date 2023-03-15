import React, { useState } from 'react'
import axios from 'axios'
import './ChangePassword.css'
import Input from '../../Controller/Input/Input';
import Button from '../Button/Button'

export default function ChangePassword() {


    const [password, setPassword] = useState(
        {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    );
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handelChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const changePassword = async (e) => {
        e.preventDefault();
        if (password.newPassword === password.confirmNewPassword) {
            try {
                setIsLoading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/change-password`, {
                    Username: JSON.parse(localStorage.getItem('user')).username,
                    Password: password.newPassword,
                    Old_Password: password.oldPassword
                })
                setMessage(data.Response);

            } catch (error) {
                setMessage(error);
            }
            finally {
                setIsLoading(false)
                setPassword({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
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
            <form autoComplete='off' className='field-body' onSubmit={changePassword}>
                {
                    message !== '' &&
                    <div className="message-box">
                        {message}
                    </div>
                }
                <div className="col">

                    <Input
                        id="old-password"
                        type="password"
                        icon="fi fi-rr-lock"
                        name='oldPassword'
                        label="Old Password"
                        autoComplete={'off'}
                        value={password.oldPassword}
                        onChange={handelChange}
                    />
                    <Input
                        icon="fi fi-rr-key"
                        type="password"
                        name='newPassword'
                        id="new-password"
                        onChange={handelChange}
                        value={password.newPassword}
                        label="New Password"
                    />
                    <Input
                        icon="fi fi-rr-key"
                        type="password"
                        name='confirmNewPassword'
                        id="confirm-new-password"
                        onChange={handelChange}
                        value={password.confirmNewPassword}
                        label="Confirm New Password"
                    />

                    <Button icon='fi fi-rr-refresh' label='Update' isLoading={isLoading} className="password-update-button" />

                </div>
            </form>
        </div>
    )
}
