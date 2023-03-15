import React from 'react'
import './Hamburger.css'


export default function Hamburger({ hamburgerStatus, setHamburgerStatus }) {
    const toggleHamburger = () => {
        setHamburgerStatus(!hamburgerStatus);
    }
    return (
        <button className={`hamburger ${hamburgerStatus ? 'active' : ''}`} onClick={toggleHamburger}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}
