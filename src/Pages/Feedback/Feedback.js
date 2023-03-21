import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FeedbackCard from '../../Components/Feedback/FeedbackCard/FeedbackCard';
import Loader from '../../Components/Loader/Loader';
import '../../Pages/CommonPage.css'

export default function Feedback() {

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (location.state) {
            setIsLoading(false);
        }
        else
            navigate('/feedbacks');
    }, [location.state, navigate])

    return (
        <section className='page feedback-page'>
            <div className="page-heading">
                {
                    location.state && <h3>{location?.state?.label} Feedbacks</h3>
                }
            </div>
            {
                <div className="feedback-container">
                    {
                        isLoading ?
                            <Loader />
                            :
                            location.state && location?.state?.feedback.map((feed) =>
                                <FeedbackCard key={feed.id} {...feed} />
                            )
                    }
                </div>
            }
        </section>
    )
}
