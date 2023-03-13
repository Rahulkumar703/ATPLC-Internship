import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Profile.css'

export default function Profile() {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState(
        {
            id: 38,
            Profile_Pic: '/Assets/Images/rahul.jpg',
            Name: "Rahul Kumar",
            College_Name: "Motihari College Of Engineering, Motihari",
            Branch: "CSE",
            Batch: 2021,
            Contact_No: 7050584103,
            Hometown: "Rajgir",
            Course_Completed: false,
            Username: 38,
            Course: 1
        }
    );

    const changePersonalInfo = async () => {

    }
    const getProfile = async (source) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/profile`, {
                Username: JSON.parse(localStorage.getItem('user')).userId
            }, { cancelToken: source })
            console.log(data);
            setProfile(data);

        } catch (error) {
            setMessage(error)
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        getProfile(source);
        return source.cancel();
    }, [])

    return (
        <div className="personal-info-field">
            <div className="field-heading">
                <h4>Personal Information</h4>
            </div>
            <form className='field-body' onSubmit={changePersonalInfo}>
                <div className="update-field">
                    {profile.Profile_Pic &&
                        <div className="profile-img">
                            <img src={profile.Profile_Pic} alt="profile-pic" />
                        </div>
                    }
                    <div className="upload-profile-img">
                        <input type="file" accept=".jpg,.jpeg,.png" id='upload-profile-pic' />
                        <label htmlFor="upload-profile-pic">
                            <i class="fi fi-rr-camera"></i>
                        </label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <input type="text" placeholder=' ' id='full-name' value={profile.Name} />
                        <label htmlFor="full-name">Name</label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <input type="text" placeholder=' ' id='college' value={profile.College_Name} />
                        <label htmlFor="college">College</label>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder=' ' id='branch' value={profile.Branch} />
                        <label htmlFor="branch">Branch</label>
                    </div>
                    <div className="input-box">
                        <input type="number" placeholder=' ' id='batch' value={profile.Batch} />
                        <label htmlFor="batch">Batch</label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <input type="text" placeholder=' ' id='hometown' value={profile.Hometown} />
                        <label htmlFor="hometown">Hometown</label>
                    </div>
                    <div className="input-box">
                        <input type="number" placeholder=' ' id='contact-no' value={profile.Contact_No} />
                        <label htmlFor="contact-no">Contact No</label>
                    </div>
                </div>
                <button className='profile-update-btn'>
                    <div className="icon">
                        {
                            isLoading ?
                                <div className="loader">
                                    <i class="fi fi-rr-loading"></i>
                                </div>
                                :
                                <i class="fi fi-rr-paper-plane-top"></i>
                        }
                    </div>
                    <div className="text">Update Profile</div>
                </button>
            </form>
        </div>
    )
}

