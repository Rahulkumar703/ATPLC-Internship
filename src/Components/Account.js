import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import userContext from '../Context/User/userContext'
import './Account.css'

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
    const logIn = () => {
        setUserState({
            id: "FS57",
            name: "Rahul",
            email: "rahulkumar703@outlook.com",
            course: "Full Stack",
            course_type: "training",
            tasks: [
                { id: 1, status: "pending", solution: "https://github.com" },
                { id: 3, status: "verified", solution: "https://github.com" },
            ]
        });

    }
    return (
        <div className="account" ref={accountRef}>
            {
                Object.entries(userState).length
                    ?
                    <>
                        <div className="header-profile row" ref={popUpRef} onClick={togglePopUp}>
                            <div className="profile-pic">
                                {userState.name[0]}
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
                                    <Link to="/profile">
                                        <div className="icon">
                                            <span className="material-symbols-rounded">
                                                person
                                            </span>
                                        </div>
                                        <div className="text">Profile
                                        </div>
                                    </Link>
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
                        <button className="login-button" onClick={logIn}>
                            <div className="icon">
                                <span className="material-symbols-rounded">
                                    login
                                </span>
                            </div>
                            <div className="text">Log In</div>
                        </button>
                    </div>
            }
        </div >
    )
}
