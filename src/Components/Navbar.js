import React from 'react'
import { HashRouter, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ hamburgerStatus, setHamburgerStatus }) {

    const handleLinkClick = () => {
        setHamburgerStatus(false)
    }

    return (
        <nav className={`navbar ${hamburgerStatus ? 'active' : ''}`}>
            <ul className="nav-list">
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/" className="nav-links">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                home
                            </span>
                        </div>
                        <div className="text">Home</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <a onClick={handleLinkClick} href="/#about" className="nav-links">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                help
                            </span>
                        </div>
                        <div className="text">About</div>
                    </a>
                </li>
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/my-courses" className="nav-links">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                book
                            </span>
                        </div>
                        <div className="text">Courses</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/gallery" className="nav-links">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                gallery_thumbnail
                            </span>
                        </div>
                        <div className="text">Gallery</div>
                    </Link>
                </li>
                <li className="nav-items">
                    <Link onClick={handleLinkClick} to="/#feedback" className="nav-links">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                forum
                            </span>
                        </div>
                        <div className="text">Feedback</div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
