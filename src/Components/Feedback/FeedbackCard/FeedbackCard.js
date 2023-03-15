import React from 'react'
import './FeedbackCard.css'

export default function FeedbackCard({ Name, College_Name, Batch, Branch, Profile_Pic, Feedback, index }) {
    return (
        <div className={`feedback-card`} >
            <div className="card-heading">
                <div className="image">
                    {
                        Profile_Pic ?
                            <img src={`${process.env.REACT_APP_BACKEND_PATH}/${Profile_Pic}`} alt="avatar" loading='lazy' />
                            :
                            <div className="avatar">
                                <i class="fi fi-rr-circle-user"></i>
                            </div>
                    }
                </div>
                <div className="heading-details">
                    <h4 className="name">{Name}</h4>
                    <span className="batch">{Branch + ' ' + Batch}</span>
                    <span className="college">{College_Name}</span>
                </div>
            </div>
            <div className="card-body">
                <p className="review">{Feedback}</p>
            </div>
        </div>
    )
}
