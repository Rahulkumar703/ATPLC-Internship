import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Profile.css'
import Loader from '../../Components/Loader/Loader'
import Input from '../../Controller/Input/Input'
import Button from '../../Components/Button/Button'


export default function Profile() {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        document.title = "ATPLC | Profile"
        document.getElementsByTagName("META")[2].content = 'Update your Profile to be get updated.'
        window.scrollTo(0, 0);
    }, [])

    const changePersonalInfo = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_PATH}/profile`, profile);
            setMessage(data?.Response);
        }
        catch (error) {
            setMessage(error?.response?.statusText || error.message)
        }
        finally {
            setIsLoading(false);
        }
    }


    const getProfile = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/profile`, {
                Username: JSON.parse(localStorage.getItem('user')).userId,
            })
            setProfile(data.response[0]);
            const localUser = JSON.parse(localStorage.getItem('user'));

            localUser.college = data.response[0].College_Name
            localStorage.setItem('user', JSON.stringify(localUser))

        } catch (error) {
            console.log(error);
            setMessage(error?.response?.statusText || error.message)
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getProfile();
    }, [])

    const handelImageUpload = (e) => {
        const image = e.target.files[0];

        const imagePreview = URL.createObjectURL(e.target.files[0]);

        setProfile({ ...profile, Profile_Pic: image, Profile_Preview: imagePreview });

    }

    const handelChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    return (
        <div className="personal-info-field">
            <div className="field-heading">
                <h4>Personal Information</h4>
            </div>
            {
                isLoading ?
                    <Loader
                    />
                    :
                    <form className='field-body' onSubmit={changePersonalInfo}>
                        <div className="update-field">
                            <div className="profile-img">
                                {
                                    profile.Profile_Preview && profile.Profile_Preview !== '' ?
                                        <img src={profile.Profile_Preview} alt="profile-pic"
                                        />
                                        :
                                        <i className="fi fi-rr-user"></i>
                                }
                            </div>

                            <div className="upload-profile-img">
                                <input type="file" accept=".jpg,.jpeg,.png" id='upload-profile-pic'
                                    onChange={handelImageUpload}
                                />
                                <label htmlFor="upload-profile-pic">
                                    <i className="fi fi-rr-camera"></i>
                                </label>
                            </div>
                        </div>

                        {
                            message !== '' &&
                            <div className="message-box">
                                {message}
                            </div>
                        }

                        <div className="update-field">
                            <Input
                                id='full-name'
                                label='Name'
                                value={profile.Name}
                                name='Name'
                                icon='fi fi-rr-id-card-clip-alt'
                                onChange={handelChange}
                            />
                        </div>
                        <div className="update-field">
                            <Input
                                id='college'
                                label='College'
                                value={profile.College_Name}
                                name='College_Name'
                                icon='fi fi-rr-graduation-cap'
                                onChange={handelChange}
                            />
                        </div>
                        <div className="update-field">
                            <Input
                                id='branch'
                                label='Branch'
                                value={profile.Branch}
                                name='Branch'
                                icon='fi fi-rr-code-branch'
                                onChange={handelChange}
                            />
                            <Input
                                id='batch'
                                label='Batch'
                                value={profile.Batch}
                                name='Batch'
                                icon='fi fi-rr-badge'
                                onChange={handelChange}
                            />
                        </div>
                        <div className="update-field">
                            <Input
                                id='hometown'
                                label='Hometown'
                                value={profile.Hometown}
                                name='Hometown'
                                icon='fi fi-rr-house-building'
                                onChange={handelChange}
                            />
                            <Input
                                id='contact-no'
                                label='Contact No'
                                value={profile.Contact_No}
                                name='Contact_No'
                                icon='fi fi-rr-mobile-notch'
                                onChange={handelChange}
                            />
                        </div>
                        <Button icon={"fi fi-rr-refresh"} label="Update Profile" isLoading={isLoading} className='profile-update-btn' type='submit' />
                    </form>
            }
        </div>
    )
}

