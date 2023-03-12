import React from 'react'
import './Hero.css'

export default function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-section-images">
                <img src="/Assets/Illustrator/female.png" alt="hero" loading='lazy' />
                <img src="/Assets/Illustrator/hand.png" alt="hero" loading='lazy' />
                <img src="/Assets/Illustrator/male.png" alt="hero" loading='lazy' />
            </div>
            <div className="hero-section-content">
                <h1 className="hero-section-heading">ATPLC</h1>
                <h2 className="hero-section-sub-heading">A Practical Learning Platform</h2>
                <p className="hero-section-description">ATPLC is a club to enhance practical learning among tech-students in their field of interest.Initiated in 2020, this club aim at enhancing and motivating students to learn proper stack of skills apart from semester syllabus to become professionally fit.For more details</p>
            </div>
            <div className="scroll-down">
                <a href='#our-experties' tabIndex={0} className="scroll-down-btn">
                    <div className="icon">
                        <i className="fi fi-rr-angle-double-small-down"></i>
                    </div>
                    <div className="text">Scroll Down</div>
                </a>
            </div>
        </div >
    )
}
