import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Theme from './Theme'
import Account from './Account'

function Header() {

    const [hamburgerStatus, setHamburgerStatus] = useState(false);

    const toggleHamburger = () => {
        setHamburgerStatus(!hamburgerStatus);
    }

    return (
        <header className='header row'>
            <div className="heading row">
                <div className="logo">
                    <figure>
                        <Link to="/">
                            <img src="/Assets/Images/atplc_logo.png" alt="ATPLC logo" />
                        </Link>
                    </figure>
                </div>
                <div className="text">
                    <Link to="/">
                        <h1>ATPLC Task Evaluator</h1>
                    </Link>
                </div>
            </div>
            <div className={`header-actions ${hamburgerStatus ? 'active' : ''}`}>
                <Theme />
                <Account />
            </div>
            <div className={`hamburger ${hamburgerStatus ? 'active' : ''}`} onClick={toggleHamburger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    )
}

export default Header
