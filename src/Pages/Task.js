import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Input from '../Components/Input';
import './Task.css'

export default function Task() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { state: { courseId, Task_No, Task_Topic, Task_Content, Task_Status, Code_Link, Remarks } } = useLocation();
    const [link, setLink] = useState(Code_Link || '');
    const [isLoading, setIsLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(true);

    const [message, setMessage] = useState('');



    const submitLink = async (e) => {
        e.preventDefault();
        if (link !== Code_Link) {
            if (link === '') {
                setMessage('Enter your task link to procede')
            }
            else {
                try {
                    setIsLoading(true);
                    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/task-submission`, {
                        course: courseId,
                        Username: JSON.parse(localStorage.getItem('user')).userId,
                        Task_No: Task_No,
                        Code_Link: link
                    })
                    setMessage(data.response)
                    console.log(data.response);
                } catch (e) {
                    setMessage(e.message);
                }
                finally {
                    setIsLoading(false);
                    setShowEdit(true)
                }
            }
        }
        else {
            setMessage('Submission link is already updated')
        }
        setIsLoading(false);
    }
    const handelChange = (e) => {
        setLink(e.target.value);
    }

    let statusLabel;
    if (Task_Status === "Under Review") {
        statusLabel = (
            <div className="status-label info row">
                <div className="icon">
                    <i className="fi fi-rr-time-forward"></i>
                </div>
                <div className="text">Under Review</div>
            </div>
        );
    } else if (Task_Status === "Rejected") {
        statusLabel = (
            <div className="status-label danger row">
                <div className="icon">
                    <i className="fi fi-rr-ban"></i>
                </div>
                <div className="text">Rejected</div>
            </div>
        );
    }
    else if (Task_Status === "Approved") {
        statusLabel = (
            <div className="status-label success row">
                <div className="icon">
                    <i className="fi fi-rr-badge-check"></i>
                </div>
                <div className="text">Verified</div>
            </div>
        );
    }
    else {
        statusLabel = (
            <div className="status-label pending row">
                <div className="icon">
                    <i className="fi fi-rr-cross-circle"></i>
                </div>
                <div className="text">Not Submitted</div>
            </div>
        );
    }


    return (
        <div className='page task-page'>
            <div className="page-heading">Task Page</div>
            <div className="page-content">
                <div className="content-heading row">
                    <div className="task-no">{Task_No < 10 ? `0${Task_No}` : Task_No}</div>
                    <div className="task-title">{Task_Topic}</div>
                </div>
                <div className="task-content">{Task_Content}</div>
                <div className="task-submisssion">
                    <div className="submission-status-remarks">
                        {statusLabel}
                        {
                            Remarks &&
                            <div className="remarks">
                                <div className="remarks-heading">
                                    <h4>Remarks</h4>
                                </div>
                                <div className="remarks-body">
                                    {Remarks}
                                </div>
                            </div>
                        }
                    </div>
                    <form className="submission-form" action="" onSubmit={submitLink}>
                        {
                            message !== '' &&
                            <div className="message-box">
                                {message}
                            </div>
                        }
                        <div className="input-box-container">
                            <Input
                                icon="fi fi-rr-link-alt"
                                type="text"
                                id='submition-link'
                                label="Submission Link"
                                name="submissionLink"
                                value={link}
                                onChange={handelChange}
                                disabled={showEdit}
                            />
                            <div className="edit" onClick={() => setShowEdit(!showEdit)}>
                                <div className="icon">
                                    {showEdit ? <i className="fi fi-rr-edit"></i> : <i className="fi fi-rr-check"></i>}
                                </div>
                            </div>
                        </div>
                        {
                            !showEdit
                            &&
                            <button type='submit' className='submit-button'>
                                <div className="icon">
                                    {
                                        isLoading &&
                                        <div className="loader">
                                            <span className="material-symbols-rounded">
                                                hourglass_empty
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div className="text">
                                    {Code_Link && submitLink !== '' ? 'Update' : 'Submit'}
                                </div>
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
