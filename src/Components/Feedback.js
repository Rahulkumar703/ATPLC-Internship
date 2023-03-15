import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Feedback.css'
import FeedbackCard from './FeedbackCard';
import Loader from './Loader'

// Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";



export default function Feedback() {

    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    const getFeedback = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/feedbacks`);
            setFeedback(data.OldFeedbacks);
        } catch (error) {
            setMessage(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getFeedback();
    }, [])




    return (
        <section className='feedback-section' id='feedback'>
            <div className="section-heading">
                <h2>Student's Feedback</h2>
            </div>
            <div className="section-body">
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        message !== ''
                            ?
                            <div className="message-box">
                                {message}
                            </div>
                            :
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                loop={true}
                                initialSlide={0}
                                centeredSlides={true}
                                fadeEffect={true}
                                grabCursor={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: true
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}

                                breakpoints={
                                    {
                                        0: {
                                            slidesPerView: 1
                                        },
                                        950: {
                                            slidesPerView: 2
                                        }
                                    }
                                }
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="feedback-container"
                            >
                                {
                                    feedback.map((feed, index) =>
                                        <SwiperSlide key={feed.id}>
                                            <FeedbackCard {...feed} index={index} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                }
            </div>
        </section >
    )
}
