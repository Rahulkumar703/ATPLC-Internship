import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './CommonPage.css'
import './Enroll.css'

export default function Enroll() {
    const location = useLocation();
    {/* <h1>{location.state.id + ' ' + location.state.courseName}</h1> */ }
    return (
        <section className='page enroll-page'>
            <div className="icon">
                <i className="fi fi-rr-snowplow"></i>
            </div>
            <div className="main-error">
                <h1>Under Construction</h1>
            </div>
            <div className="sub-error">
                <h1>Comming Soon </h1>
            </div>
            <Link to='/'>
                <div className="icon">
                    <i className="fi fi-rr-home"></i>
                </div>
                <div className="text">Home</div>
            </Link>
        </section>
    )
}
