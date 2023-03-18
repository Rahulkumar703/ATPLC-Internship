import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'

export default function CourseCard({ id, courseName, courseDuration, coverImage, courseCompletionStatus }) {



    const [isEnrolled, setIsEnrolled] = useState(false);


    useEffect(() => {
        const enrolledCourses = JSON.parse(localStorage.getItem('courses')).map(course => course.Course_id);
        enrolledCourses.forEach(enrolledCourseId => {
            if (enrolledCourseId === id)
                setIsEnrolled(true)
        })
    }, [id])


    return (
        <div className='course-card'>
            <div className="course-cover">
                <div className='cover-image'>
                    {console.log(coverImage)}
                    {
                        coverImage && coverImage !== '/media/' ?
                            <img src={`${process.env.REACT_APP_BACKEND_PATH}${coverImage}`} alt="course thumbnail" />
                            :
                            <div className='cover-default-image'> {'</>'}</div>
                    }
                </div>
                <div className="course-name">
                    {courseName}
                </div>
            </div>
            <div className="course-content">
                {
                    courseDuration !== 0 &&
                    <div className="course-duration">
                        <div className="icon">
                            <i className="fi fi-rr-hourglass-start"></i>
                        </div>
                        <div className="text">
                            {courseDuration} Month
                        </div>
                    </div>
                }
                <div className="course-card-buttons">
                    {
                        isEnrolled ?
                            <Link tabIndex={0} to={`/my-courses/${courseName}`} state={{ id, courseName }} className="course-card-btn">
                                <div className="icon">
                                    <i className="fi fi-rr-dashboard"></i>
                                </div>
                                <div className="text">Continue to Dashboard</div>
                            </Link>
                            :
                            <Link tabIndex={0} to={`/enroll/${courseName}`} state={{ id, courseName }} className="course-card-btn">
                                <div className="icon">
                                    <i className="fi fi-rr-file-signature"></i>
                                </div>
                                <div className="text">Enroll Now</div>
                            </Link>

                    }
                </div>
            </div>
            {courseCompletionStatus && <div className="course-status">Completed</div>}
        </div>
    )
}
