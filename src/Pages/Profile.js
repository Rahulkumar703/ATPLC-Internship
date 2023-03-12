import React from 'react'
import './Profile.css'

export default function Profile() {

    const changePersonalInfo = async () => {

    }

    return (
        <div className="password-field">
            <div className="field-heading">
                <h4>Personal Information</h4>
            </div>
            <form className='field-body' onSubmit={changePersonalInfo}>
                <div className="profile-img"></div>
            </form>
        </div>
    )
}

