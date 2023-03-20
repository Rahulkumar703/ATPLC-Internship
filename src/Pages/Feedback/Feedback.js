import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader';
import Error from '../Error/Error'

export default function Feedback() {

    const [feedback, setFeedback] = useState([{ 1: 'as' }, { 2: 'asd' }]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');



    const fetchFeedback = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_PATH}/all-feedback`);
            setFeedback(data);
            console.log(feedback);

        } catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [feedback])

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchFeedback();
    }, [fetchFeedback])

    return (
        <section className='page feedback-page'>
            {
                error !== ''
                    ?
                    < Error error={error} />
                    :
                    isLoading
                        ?
                        <Loader />
                        :
                        <div className="feedback-container">
                            {feedback.map((feed, index) => {
                                return (
                                    console.log(feed, index)
                                )
                            })}
                        </div>
            }
        </section>
    )
}
