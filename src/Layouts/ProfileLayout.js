import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function ProfileLayout() {

    const [isExpanded, setIsExpanded] = useState(false);

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
                <div className={`sidebar ${isExpanded ? 'active' : ''}`}>
                    <button className="expand-button">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                expand_more
                            </span>
                        </div>
                    </button>

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
                    <NavLink to="/" className={({ isActive }) => isActive ? "sidebar-links active" : "sidebar-links"} onClick={logOut}>
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

const header = () =>
    <div className="profile-header">
        <div className="profile-pic">
            {
                JSON.parse(localStorage.getItem('user')).fullName[0]
            }
        </div>
        <div className="profile-details">
            <div className="name profile-info">
                <span>Name : </span>
                <span>
                    {
                        JSON.parse(localStorage.getItem('user')).fullName
                    }
                </span>
            </div>
            <div className="roll-no profile-info">
                <span>Roll No : </span>
                <span>
                    {
                        JSON.parse(localStorage.getItem('user')).username
                    }
                </span>
            </div>
            <div className="courses profile-info">
                <span>Enrolled Courses : </span>
                {
                    JSON.parse(localStorage.getItem('courses')).map(course => {

                        return <span className='course' key={course.Course_id}>
                            {course.Course__Course_Name}
                        </span>
                    })
                }
            </div>
        </div>
    </div>
