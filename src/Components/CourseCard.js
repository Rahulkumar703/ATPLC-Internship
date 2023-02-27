import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'

export default function CourseCard({ courseName, courseDuration, coverImage }) {
    return (
        <div className='course-card'>
            <div className="course-cover">
                <div className='cover-image'>
                    {
                        coverImage ?
                            <img src={`https://atplc20.pythonanywhere.com${coverImage}`} alt="course thumbnail" />
                            :
                            <div className='cover-default-image'> {'</>'}</div>
                    }
                </div>
                <div className="course-name">
                    {courseName}
                </div>
            </div>
            <div className="course-content">
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
                <div className="enroll-course">
                    <Link to='/' className="enroll-course-btn">Continue Learning</Link>
                </div>
            </div>
        </div>
    )
}
