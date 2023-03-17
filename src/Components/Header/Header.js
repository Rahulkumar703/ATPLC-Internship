import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Theme from '../Theme/Theme'
import Account from '../Account/Account'
import Hamburger from '../Header/Hamburger/Hamburger'
import Navbar from '../Header/Navbar/Navbar'

function Header() {

    const headerRef = useRef();
    const [hamburgerStatus, setHamburgerStatus] = useState(false);
    const [isGoToTopVisible, setIsGoToTopVisible] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            setHamburgerStatus(false)

            if (window.scrollY > 300) {
                setIsGoToTopVisible(true);
            }
            else setIsGoToTopVisible(false);

            if (window.scrollY > 50) {
                headerRef.current.classList.add('active');
            }
            else
                headerRef.current.classList.remove('active');
        }
    }, [])



    useEffect(() => {
        if (hamburgerStatus || window.scrollY > 50) {
            headerRef.current.classList.add('active');
        }
        else
            headerRef.current.classList.remove('active');
    }, [hamburgerStatus])

    const goToTop = () => {
        window.scrollTo(0, 0)
    }


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
                            <Account setHamburgerStatus={setHamburgerStatus} />
                        </div>
                    </div>
                    <Hamburger hamburgerStatus={hamburgerStatus} setHamburgerStatus={setHamburgerStatus} />
                </div>
            </header>
            <button className={`go-to-top ${isGoToTopVisible ? 'visible' : ''}`} onClick={goToTop}>
                <div className="icon">
                    <i className="fi fi-rr-arrow-small-up"></i>
                </div>
            </button>
        </>
    )
}

export default Header
