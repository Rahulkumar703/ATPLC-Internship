import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Theme from './Theme'
import Account from './Account'
import Hamburger from './Hamburger'

function Header() {

    const headerRef = useRef();
    const [hamburgerStatus, setHamburgerStatus] = useState(false);


    return (
        <header className='header row' ref={headerRef}>
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
            <div className={`header-actions ${hamburgerStatus ? 'active' : ''}`} >
                <Theme />
                <Account />
            </div>
            <Hamburger hamburgerStatus={hamburgerStatus} setHamburgerStatus={setHamburgerStatus} />
        </header>
    )
}

export default Header
