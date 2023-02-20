import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Theme from './Theme'
import Account from './Account'
import Hamburger from './Hamburger'
import Navbar from './Navbar'

function Header() {

    const headerRef = useRef();
    const [hamburgerStatus, setHamburgerStatus] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            setHamburgerStatus(false)
            if (window.scrollY > 50) {
                headerRef.current.classList.add('active');
            }
            else
                headerRef.current.classList.remove('active');
        }
    }, [])

    useEffect(() => {
        if (hamburgerStatus) {
            headerRef.current.classList.add('active');
        }
        else
            headerRef.current.classList.remove('active');
    }, [hamburgerStatus])


    return (
        <>
            <header className='header col' ref={headerRef}>
                <div className="row">
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
                                <h1>ATPLC</h1>
                            </Link>
                        </div>
                    </div>
                    <div className={`header-actions ${hamburgerStatus ? 'active' : ''}`} >
                        <Navbar hamburgerStatus={hamburgerStatus} setHamburgerStatus={setHamburgerStatus} />
                        <div className="row">
                            <Theme />
                            <Account />
                        </div>
                    </div>
                    <Hamburger hamburgerStatus={hamburgerStatus} setHamburgerStatus={setHamburgerStatus} />
                </div>
            </header>
        </>
    )
}

export default Header
