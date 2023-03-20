import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Feedback.css'
import FeedbackCard from '../Feedback/FeedbackCard/FeedbackCard';
import Loader from '../Loader/Loader'

// Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation, Autoplay, Keyboard, EffectCoverflow } from "swiper";



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
                <h2>Our Testimonials</h2>
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
                                spaceBetween={10}
                                slidesPerView={1}
                                centeredSlides={true}
                                loop={true}
                                initialSlide={0}
                                effect={"coverflow"}
                                fadeEffect={true}
                                grabCursor={true}
                                keyboard={{
                                    enabled: true,
                                }}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 5,
                                    modifier: 1,
                                    slideShadows: false,
                                }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    clickable: true,
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
                                modules={[EffectCoverflow, Keyboard, Autoplay, Pagination, Navigation]}
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
