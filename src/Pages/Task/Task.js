import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../../Components/Button/Button';
import Input from '../../Controller/Input/Input';
import './Task.css'

export default function Task() {

    const { state } = useLocation();
    let { courseId, Task_No, Task_Topic, Task_Content, Task_Status, Code_Link, Remarks, Output_Link } = state;

    const [taskStatus, setTaskStatus] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        setTaskStatus(Task_Status);
        if (taskStatus === 'Under Review') {
            setRemarks('')
        }
        else setRemarks(Remarks);
    }, [Task_Status, Remarks, taskStatus])


    const [isLoading, setIsLoading] = useState(false);
    const [link, setLink] = useState(
        {
            codeLink: Code_Link || '',
            outputLink: Output_Link || ''
        }
    );
    const [showEdit, setShowEdit] = useState(
        {
            codeLink: true,
            outputLink: true
        }
    );

    const [message, setMessage] = useState('');



    const submitLink = async (e) => {
        e.preventDefault();
        if (link.codeLink === '' && link.outputLink === '') {
            setMessage('Enter your link to procede');
        }
        else if (link.codeLink === Code_Link && link.outputLink === Output_Link) {
            setMessage('Submission link is already updated');
        }
        else {
            try {
                setIsLoading(true);
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/task-submission`, {
                    course: courseId,
                    Username: JSON.parse(localStorage.getItem('user')).userId,
                    Task_No: Task_No,
                    Code_Link: link.codeLink,
                    Output_Link: link.outputLink
                })
                setMessage(data.response)
            } catch (e) {
                setMessage(e.message);
            }
            finally {
                setIsLoading(false);
                setTaskStatus("Under Review");
            }
        }
        setIsLoading(false);
    }

    const handelChange = (e) => {
        setLink({ ...link, [e.target.name]: e.target.value });
    }


    let statusLabel;
    if (taskStatus === "Under Review") {
        statusLabel = (
            <div className="status-label info row">
                <div className="icon">
                    <i className="fi fi-rr-time-forward"></i>
                </div>
                <div className="text">Under Review</div>
            </div>
        );
    } else if (taskStatus === "Rejected") {
        statusLabel = (
            <div className="status-label danger row">
                <div className="icon">
                    <i className="fi fi-rr-ban"></i>
                </div>
                <div className="text">Rejected</div>
            </div>
        );
    }
    else if (taskStatus === "Approved") {
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
                <div className="task-content">
                    {
                        Task_Content.split('\r\n').map((element, index) => {
                            return <p key={index}>{element}</p>;
                        })
                    }
                </div>
                <div className="task-submisssion">
                    <div className="submission-status-remarks">
                        {statusLabel}
                        {
                            remarks &&
                            <div className="remarks">
                                <div className="remarks-heading">
                                    <h4>Remarks</h4>
                                </div>
                                <div className="remarks-body">
                                    {remarks}
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
                        <h4 className='input-heading'>Enter your Task Code Link</h4>
                        <div className="input-box-container">
                            <Input
                                icon="fi fi-rr-display-code"
                                type="text"
                                id='code-link'
                                label="Code Link"
                                name="codeLink"
                                value={link.codeLink}
                                onChange={handelChange}
                                disabled={showEdit.codeLink}
                            />
                            <div className="edit" onClick={() => setShowEdit({ ...showEdit, codeLink: !showEdit.codeLink })}>
                                <div className="icon">
                                    {showEdit.codeLink ? <i className="fi fi-rr-edit"></i> : <i className="fi fi-rr-check"></i>}
                                </div>
                            </div>
                        </div>
                        <h4 className='input-heading'>Enter your Task Webpage/Task Output Link</h4>
                        <div className="input-box-container">
                            <Input
                                icon="fi fi-rr-pulse"
                                type="text"
                                id='output-link'
                                label="Output Link"
                                name="outputLink"
                                value={link.outputLink}
                                onChange={handelChange}
                                disabled={showEdit.outputLink}
                            />
                            <div className="edit" onClick={() => setShowEdit({ ...showEdit, outputLink: !showEdit.outputLink })}>
                                <div className="icon">
                                    {showEdit.outputLink ? <i className="fi fi-rr-edit"></i> : <i className="fi fi-rr-check"></i>}
                                </div>
                            </div>
                        </div>
                        {
                            (link.codeLink !== Code_Link || link.outputLink !== Output_Link)
                            &&
                            <Button type="submit" className='submit-button' icon="fi fi-rr-arrow-up-from-square" label='Submit' isLoading={isLoading} />
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
