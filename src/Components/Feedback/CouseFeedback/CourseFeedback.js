import { useState } from 'react'
import Button from '../../Button/Button'
import './CourseFeedback.css'
import Input from '../../../Controller/Input/Input'
import axios from 'axios'

export default function CourseFeedback() {

    const [feedbackPopUP, setFeedbackPopUP] = useState(false)
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendFeedback = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/submit-feedback`, {
                Username: JSON.parse(localStorage.getItem('user')).userId,
                Feedback: feedback
            })

            console.log(data);
            setMessage('your feedback has been send to server')

        } catch (error) {
            console.log(error);
            setMessage('Oops! Somthing went Wrong');

        }
        finally {
            setIsLoading(false)
        }
    }




    const handelChange = (e) => {
        setFeedback(e.target.value)
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        sendFeedback();
        setFeedbackPopUP(false)
    }



    return (

        <section className="course-feedback-section">
            <div className="section-heading">
                <h4>Your Feedback</h4>
            </div>
            <div className="section-body">
                <p>
                    ATPLC would be delighted to hear about your experience during this course and any suggestions you may have to improve it.
                </p>
                {message !== '' && <div className="message-box">{message}</div>}
                < Button icon={feedbackPopUP ? "fi fi-rr-angle-up" : "fi fi-rr-angle-down"} label="Provide Feedback" className="feedback-button" onClick={() => { setFeedbackPopUP(!feedbackPopUP) }} />

                {
                    feedbackPopUP &&
                    <div className="feedbcak-popup">
                        <form onSubmit={handelSubmit}>
                            <Input type={'textarea'} label="Feedback" value={feedback} onChange={handelChange} />
                            <Button icon="fi fi-rr-arrow-up-from-square" type='submit' label={'Submit'} isLoading={isLoading} className="submit-feedback" />
                        </form>
                    </div>
                }
            </div>
        </section>
    )
}
