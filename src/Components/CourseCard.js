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
                            <img src={`https://th.bing.com/th/id/R.3d88a927f8529dcba03364b09d98adbe?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0`} alt="course thumbnail" />
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
