import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Profile.css'

export default function Profile() {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState(
        {
            id: 38,
            Profile_Pic: '',
            Profile_Preview: '',
            Name: "",
            College_Name: "",
            Branch: "",
            Batch: '',
            Contact_No: '',
            Hometown: '',
            Username: '',
        }
    );

    const changePersonalInfo = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/profile`, profile);

            console.log('updating profile - ' + data);
        }
        catch (error) {
            setMessage(error.response.statusText || error.message)
        }
        finally {
            setIsLoading(false);
        }
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
            setMessage(error.response.statusText || error.message)
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

    const handelImageUpload = (e) => {
        const image = e.target.files[0];

        const imagePreview = URL.createObjectURL(e.target.files[0]);

        setProfile({ ...profile, Profile_Pic: image, Profile_Preview: imagePreview });

    }

    const handelChange = (e, name) => {
        setProfile({ ...profile, [name]: e.target.value })
    }

    return (
        <div className="personal-info-field">
            <div className="field-heading">
                <h4>Personal Information</h4>
            </div>
            <form className='field-body' onSubmit={changePersonalInfo}>
                <div className="update-field">
                    <div className="profile-img">
                        {
                            profile.Profile_Preview !== '' ?
                                <img src={profile.Profile_Preview} alt="profile-pic" />
                                :
                                <i className="fi fi-rr-user"></i>
                        }
                    </div>

                    <div className="upload-profile-img">
                        <input type="file" accept=".jpg,.jpeg,.png" id='upload-profile-pic' onChange={handelImageUpload} />
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
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-id-card-clip-alt"></i>
                        </div>
                        <input type="text" placeholder=' ' id='full-name' value={profile.Name} onChange={(e) => handelChange(e, 'Name')} />
                        <label htmlFor="full-name">Name</label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-graduation-cap"></i>
                        </div>
                        <input type="text" placeholder=' ' id='college' value={profile.College_Name} onChange={(e) => handelChange(e, 'College_Name')} />
                        <label htmlFor="college">College</label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-code-branch"></i>
                        </div>
                        <input type="text" placeholder=' ' id='branch' value={profile.Branch} onChange={(e) => handelChange(e, 'Branch')} />
                        <label htmlFor="branch">Branch</label>
                    </div>
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-badge"></i>
                        </div>
                        <input type="number" placeholder=' ' id='batch' value={profile.Batch} onChange={(e) => handelChange(e, 'Batch')} />
                        <label htmlFor="batch">Batch</label>
                    </div>
                </div>
                <div className="update-field">
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-house-building"></i>
                        </div>
                        <input type="text" placeholder=' ' id='hometown' value={profile.Hometown} onChange={(e) => handelChange(e, 'Hometown')} />
                        <label htmlFor="hometown">Hometown</label>
                    </div>
                    <div className="input-box">
                        <div className="icon">
                            <i className="fi fi-rr-mobile-notch"></i>
                        </div>
                        <input type="number" placeholder=' ' id='contact-no' value={profile.Contact_No} onChange={(e) => handelChange(e, 'Contact_No')} />
                        <label htmlFor="contact-no">Contact No</label>
                    </div>
                </div>
                <button className='profile-update-btn'>
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
                    <div className="text">Update Profile</div>
                </button>
            </form>
        </div>
    )
}

