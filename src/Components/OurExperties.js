import React from 'react'
import { Link } from 'react-router-dom'
import './OurExperties.css'

export default function Facilities() {
    return (
        <section className="our-experties-section">
            <div className="section-heading">
                <h2>Our Expertiese</h2>
            </div>
            <div className="section-body">
                <div className="left image-box">
                    <img src="/Assets/Illustrator/Characterl.png" alt="character" />
                </div>
                <div className="card-container">
                    <Link to="/my-courses" className="training facility-card">
                        <img src="/Assets/Illustrator/Training.png" alt="Training" />
                        <h3>Training</h3>
                    </Link>
                    <Link to="/internship" className="internship facility-card">
                        <img src="/Assets/Illustrator/Internship.png" alt="Internship" />
                        <h3>Intership</h3>
                    </Link>
                </div>
                <div className="right image-box">
                    <img src="/Assets/Illustrator/Characterr.png" alt="character" />
                </div></div>
        </section>
    )
}
