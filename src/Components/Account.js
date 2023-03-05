import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import userContext from '../Context/User/userContext'
import './Account.css'
import LogInWithGithub from './LogInWithGithub';

export default function Account({ accountRef, setHamburgerStatus }) {

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
        localStorage.removeItem('user')
        localStorage.removeItem('tasks')
        window.location.assign('/');
    }


    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div className="account" ref={accountRef}>
            {
                JSON.parse(localStorage.getItem('user'))
                    ?
                    <>
                        <div className="header-profile row" ref={popUpRef} onClick={togglePopUp}>
                            <div className="profile-pic">
                                {JSON.parse(localStorage.getItem('user')).username.slice(-2)}
                            </div>
                            <div className="profile-details col">
                                <div className="profile-name">{JSON.parse(localStorage.getItem('user')).username}</div>
                                <div className="profile-email">{userState.email}</div>
                            </div>
                        </div>
                        <div className={`profile-popup ${popUpStatus ? 'active' : ''}`}>
                            <ul>
                                <li id='user-id'>
                                    <div className="icon">

                                    </div>
                                    <div className="text">Id : {JSON.parse(localStorage.getItem('user')).username}</div>
                                </li>
                                <li>
                                    <Link to="/profile" onClick={scrollToTop} >
                                        <div className="icon">
                                            <span className="material-symbols-rounded">
                                                person
                                            </span>
                                        </div>
                                        <div className="text">Profile
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-courses" onClick={scrollToTop}>
                                        <div className="icon">
                                            <span className="material-symbols-rounded">
                                                library_books
                                            </span>
                                        </div>
                                        <div className="text">My Courses
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
                    <div className="header-login" onClick={() => setHamburgerStatus(false)}>
                        <LogInWithGithub />
                    </div>
            }
        </div >
    )
}
