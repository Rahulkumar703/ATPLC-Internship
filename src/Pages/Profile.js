import axios from 'axios';
import React, { useState } from 'react'
import './Profile.css'

export default function Profile() {
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
        <section className='page profile-page'>
            <div className="section-heading">
                <h3>Profile</h3>
            </div>
            <div className="seciton-body">
                <div className="profile-header">
                    <div className="profile-pic">
                        {
                            JSON.parse(localStorage.getItem('user')).fullName[0]
                        }
                    </div>
                    <div className="profile-details">
                        <div className="name profile-info">
                            <span>Name : </span>
                            <span>
                                {
                                    JSON.parse(localStorage.getItem('user')).fullName
                                }
                            </span>
                        </div>
                        <div className="roll-no profile-info">
                            <span>Roll No : </span>
                            <span>
                                {
                                    JSON.parse(localStorage.getItem('user')).username
                                }
                            </span>
                        </div>
                        <div className="courses profile-info">
                            <span>Enrolled Courses : </span>
                            {
                                JSON.parse(localStorage.getItem('courses')).map(course => {

                                    return <span className='course' key={course.Course_id}>
                                        {course.Course__Course_Name}
                                    </span>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="edit-profile">
                    <div className="edit password-filed">
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
                                <button type='submit'>
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
                </div>
            </div>
        </section >
    )
}


