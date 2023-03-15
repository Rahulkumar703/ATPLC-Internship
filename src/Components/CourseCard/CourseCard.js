import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.css'

export default function CourseCard({ id, courseName, courseDuration, coverImage, courseCompletionStatus }) {


    return (
        <div className='course-card'>
            <div className="course-cover">
                <div className='cover-image'>
                    {
                        coverImage ?
                            <img src={`${process.env.REACT_APP_BACKEND_PATH}/${coverImage}`} alt="course thumbnail" />
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
                        courseDuration === 0 ?
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
