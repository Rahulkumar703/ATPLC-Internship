import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../Pages/Profile.css'

export default function ProfileLayout() {


    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/', { replace: true });
    }
    return (
        <section className='page profile-page'>
            <div className="section-heading">
                <h3>Profile</h3>
            </div>
            <div className="seciton-body">
                <div className={`sidebar`}>

                    <NavLink end to="" className={({ isActive }) => isActive ? "sidebar-links active" : "sidebar-links"}>
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                contact_mail
                            </span>
                        </div>
                        <div className="text">
                            Personal Info
                        </div>
                    </NavLink>

                    <NavLink end to="update-password" className={({ isActive }) => isActive ? "sidebar-links active" : "sidebar-links"}>
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                key
                            </span>
                        </div>
                        <div className="text">
                            Change Password
                        </div>
                    </NavLink>
                    <NavLink to="/" className={({ isActive }) => isActive ? "sidebar-links logout active" : "sidebar-links logout"} onClick={logOut}>
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                logout
                            </span>
                        </div>
                        <div className="text">
                            Log Out
                        </div>
                    </NavLink>
                </div>

                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </section >
    )
}

