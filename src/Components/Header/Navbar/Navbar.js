import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ hamburgerStatus, setHamburgerStatus }) {


    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        setHamburgerStatus(false)
    }
    const scrollTo = (elementId) => {
        const element = document.querySelector(elementId);
        element.scrollIntoView(elementId)
    }

    return (
        <nav className={`navbar ${hamburgerStatus ? 'active' : ''}`}>
            <ul className="nav-list">
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/" className="nav-links">
                        <div className="icon">
                            <i className="fi fi-rr-home"></i>
                        </div>
                        <div className="text">Home</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link onClick={() => { scrollTo('#footer') }} to="#" className="nav-links">
                        <div className="icon">
                            <i className="fi fi-rr-info"></i>
                        </div>
                        <div className="text">About</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/events" className="nav-links">
                        <div className="icon">
                            <i className="fi fi-rr-calendar-star"></i>
                        </div>
                        <div className="text">Events</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/gallery" className="nav-links">
                        <div className="icon">
                            <i className="fi fi-rr-layout-fluid"></i>
                        </div>
                        <div className="text">Gallery</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link to="/feedbacks" className="nav-links">
                        <div className="icon">
                            <i className="fi fi-rr-comment"></i>
                        </div>
                        <div className="text">Feedback</div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
