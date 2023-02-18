import React, { useRef } from 'react'
import './Hamburger.css'


export default function Hamburger({ hamburgerStatus, setHamburgerStatus }) {
    const hamburgerRef = useRef();
    const toggleHamburger = () => {
        setHamburgerStatus(!hamburgerStatus);
    }
    return (
        <div className={`hamburger ${hamburgerStatus ? 'active' : ''}`} ref={hamburgerRef} onClick={toggleHamburger}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
