import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../Context/User/userContext'
import './Account.css'
import LogInWithGithub from './LogInWithGithub';

export default function Account({ accountRef }) {

    const { userState, setUserState } = useContext(userContext);
    const [popUpStatus, setPopUpStatus] = useState(false);
    const popUpRef = useRef();

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target !== popUpRef.current)
                setPopUpStatus(false);
        })
    }, [])

    const togglePopUp = () => {
        setPopUpStatus(!popUpStatus);
    }
    const logOut = async () => {
        await setUserState({});
    }



    return (
        <div className="account" ref={accountRef}>
            {
                Object.entries(userState).length
                    ?
                    <>
                        <div className="header-profile row" ref={popUpRef} onClick={togglePopUp}>
                            <div className="profile-pic">
                                <img src={userState.profileImg} alt="profile" />
                            </div>
                            <div className="profile-details col">
                                <div className="profile-name">{userState.name}</div>
                                <div className="profile-email">{userState.email}</div>
                            </div>
                        </div>
                        <div className={`profile-popup ${popUpStatus ? 'active' : ''}`}>
                            <ul>
                                <li id='user-id'>
                                    <div className="icon">

                                    </div>
                                    <div className="text">Id : {userState.id}</div>
                                </li>
                                <li>
                                    <a href={userState.githubProfile} target="_blank" rel="noreferrer">
                                        <div className="icon">
                                            <span className="material-symbols-rounded">
                                                person
                                            </span>
                                        </div>
                                        <div className="text">Profile
                                        </div>
                                    </a>
                                </li>
                                <li onClick={logOut}>
                                    <div className="icon">
                                        <span className="material-symbols-rounded">
                                            logout
                                        </span>
                                    </div>
                                    <div className="text">Log Out</div>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    <div className="header-login">
                        <LogInWithGithub />
                    </div>
            }
        </div >
    )
}
