import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import Error from '../Pages/Error/Error'
import '../Pages/CommonPage.css'
import '../Pages/Feedback/Feedback.css'

export default function Feedback() {

    const [feedback, setFeedback] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
                        <h3>Feedback</h3>
                    </div>
                    <div className="feedback-navigation">
                        <Link to="trainee" state={{ feedback: feedback.Trainee_Feedbacks, label: 'Trainee' }}>Trainee</Link>
                        <Link to="intern" state={{ feedback: feedback.Interns_Feedbacks, label: 'Intern' }}>Intern</Link>
                    </div>
                </section>

    )
}
