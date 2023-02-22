import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'

export default function CourseCard({ courseName, courseDuration, coverImage }) {
    return (
        <div className='course-card'>
            <div className="course-image">
                <figure>
                    <img src={coverImage} alt="Course Cover" />
                </figure>
            </div>
            <div className="course-heading">
                <div className="course-name">
                    {courseName}
                </div>
                <div className="course-duration">
                    <div className="icon">
                        <span className="material-symbols-rounded">
                            schedule
                        </span>
                    </div>
                    <div className="text">
                        {courseDuration}
                    </div>
                </div>
                <div className="course-techs">
                    <div className="tech">HTML</div>
                    <div className="tech">CSS</div>
                    <div className="tech">JavaScript</div>
                    <div className="tech">PHP</div>
                    <div className="tech">MySQL</div>
                </div>
            </div>
            <div className="enroll-course">
                <Link to='/' className="enroll-course-btn">Enroll Now</Link>
            </div>
        </div>
    )
}
