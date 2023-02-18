import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import userContext from '../Context/User/userContext'
import './Account.css'

export default function Account({ accountRef }) {

    const { userState, dispatch } = useContext(userContext);
    const [popUpStatus, setPopUpStatus] = useState(false);
    const popUpRef = useRef();

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target !== popUpRef.current)
                setPopUpStatus(false);
        })
    }, [])

    const logOut = () => {
        dispatch({ type: "LOG_OUT" });
    }
    const logIn = () => {
        dispatch({ type: "LOG_IN" });
    }
    const togglePopUp = () => {
        setPopUpStatus(!popUpStatus);
    }
    return (
        <div className="account" ref={accountRef}>
            {
                userState.isLoggedIn
                    ?
                    <>
                        <div className="header-profile row" ref={popUpRef} onClick={togglePopUp}>
                            <div className="profile-pic">
                                {userState.user.name.slice(0, 1)}
                            </div>
                            <div className="profile-name">Devil</div>
                        </div>
                        <div className={`profile-popup ${popUpStatus ? 'active' : ''}`}>
                            <ul>
                                <li id='user-id'>
                                    <div className="icon">

                                    </div>
                                    <div className="text">Id : {userState.user.rollno}</div>
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
                                    <Link to="/">
                                        <div className="icon">
                                            <span className="material-symbols-rounded">
                                                logout
                                            </span>
                                        </div>
                                        <div className="text">Log Out</div>
                                    </Link>
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
