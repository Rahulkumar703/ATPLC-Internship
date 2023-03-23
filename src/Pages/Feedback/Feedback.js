import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader';
import Error from '../Error/Error'
import '../CommonPage.css'
import './Feedback.css'
import FeedbackCard from '../../Components/Feedback/FeedbackCard/FeedbackCard';

export default function Feedback() {

    const [feedback, setFeedback] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchFeedback = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/all-feedbacks`);
                setFeedback(data);

            } catch (error) {
                setError(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchFeedback();
    }, [])

    const handelClick = (e) => {
        setFilter(e.target.value)
        const buttons = [...e.target.parentElement.children]
        buttons.forEach(button => {
            button.classList.remove('active')
        });
        e.target.classList.add('active');
        window.scrollTo(0, 0);
    }

    return (

        error !== ''
            ?
            < Error error={error} />
            :
            isLoading
                ?
                <Loader />
                :
                <section className='page feedback-page'>
                    <div className="page-heading">
                        <h3>Feedbacks</h3>
                    </div>
                    <div className="feedback-navigation">
                        <button onClick={handelClick} value="Trainee">
                            <div className="icon">
                                <i className="fi fi-rr-gym"></i>
                            </div>
                            <div className="icon">Trainee</div>
                        </button>
                        <button onClick={handelClick} value="Intern">
                            <div className="icon">
                                <i className="fi fi-rr-house-laptop"></i>
                            </div>
                            <div className="text">
                                Intern
                            </div>
                        </button>
                    </div>
                    <div className="feedback-container">
                        {

                            Object.values(feedback).map(e => {
                                return e.filter(filterFeed => {
                                    if (filter !== '')
                                        return filterFeed.Feedback_Type === filter
                                    else return true;
                                }).map((feed) => {
                                    return <FeedbackCard key={feed.id} {...feed} />
                                })
                            })
                        }
                    </div>
                </section>

    )
}
