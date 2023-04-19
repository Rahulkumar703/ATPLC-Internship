import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'

export default function CourseCard({ id, courseName, courseDuration, coverImage, courseCompletionStatus, couresPrice, courseTechnologies }) {

    const [isEnrolled, setIsEnrolled] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('courses')) {

            const enrolledCourses = JSON.parse(localStorage.getItem('courses')).map(course => course.Courses_id);
            enrolledCourses.forEach(enrolledCourseId => {
                if (enrolledCourseId === id) {
                    setIsEnrolled(true)
                }
            })
        }
    }, [id])


    return (
        <div className='course-card'>
            <div className="course-cover">
                <div className='cover-image'>
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

                <div className="course-price-duration">
                    {
                        courseDuration !== 0 ?
                            <div className="course-duration">
                                <div className="icon">
                                    <i className="fi fi-rr-hourglass-start"></i>
                                </div>
                                <div className="text">
                                    {courseDuration} Month
                                </div>
                            </div>
                            :
                            null
                    }
                    {
                        (couresPrice !== null && !isEnrolled) ?
                            <div className="course-price">
                                <div className="icon">
                                    <i className="fi fi-rr-indian-rupee-sign"></i>
                                </div>
                                <div className="text">
                                    {couresPrice}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
                {
                    courseTechnologies !== null &&
                    <div className="techs">
                        {
                            courseTechnologies.split(',').map((tech, index) => {
                                return <span className='tech' key={index}>{tech}</span>
                            })
                        }
                    </div>
                }

                <div className="course-card-buttons">
                    {
                        isEnrolled ?
                            <Link tabIndex={0} to={`/my-courses/${id}/${courseName}`} className="course-card-btn">
                                <div className="icon">
                                    <i className="fi fi-rr-dashboard"></i>
                                </div>
                                <div className="text">Continue to Dashboard</div>
                            </Link>
                            :
                            <Link tabIndex={0} to={`/enroll/${courseName}`} className="course-card-btn">
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
