import axios from 'axios';
import React, { useState } from 'react'

export default function Profile() {
    const [newPassword, setNewPassword] = useState('');
    const changePassword = async (e) => {
        e.preventDefault();

        try {

            const { data } = await axios.post('https://atplc20.pythonanywhere.com/change-password', {
                Username: JSON.parse(localStorage.getItem('user')).userId,
                Password: newPassword
            })

            console.log(data);

        } catch (error) {
            console.log(error);
        }
        finally {
            setNewPassword('')
        }

    }
    return (
        <section className='page profile-page'>
            <div className="section-heading">
                <h3>Profile</h3>
            </div>
            <div className="seciton-body">
                <div className="change-password">
                    <form action="" onSubmit={changePassword}>
                        <div className="input-box">
                            <input type="password" placeholder=' ' required id='password' onChange={(e) => { setNewPassword(e.target.value) }} />
                            <label htmlFor="password">New Password</label>
                        </div>
                        <button type='submit'>Change Password</button>
                    </form>
                </div>
            </div>
        </section >
    )
}
