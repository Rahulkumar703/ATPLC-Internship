import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../Context/User/userContext'
import './Account.css'

export default function Account() {

    const { userState, dispatch } = useContext(userContext);
    const [popUpStatus, setPopUpStatus] = useState(false);
    const popUpRef = useRef();

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target !== popUpRef.current) setPopUpStatus(false);
        })
    })

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
        <div className="account">
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
                                <li id='user-id'>Id : {userState.user.rollno}</li>
                                <li>Profile</li>
                                <li onClick={logOut}>Log Out</li>
                            </ul>
                        </div>
                    </>
                    :
                    <div className="header-login">
                        <button className="login-button" onClick={logIn}>Log in</button>
                    </div>
            }
        </div>
    )
}
