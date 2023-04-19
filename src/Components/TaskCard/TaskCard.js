import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.css';

export default function TaskCard({ courseId, Task_No, Task_Id, Task_Topic, Task_Content, Task_Status, Code_Link, Output_Link, Remarks }) {

    const taskNumber = Task_No < 10 ? `0${Task_No}` : Task_No;


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

    if (Task_Id !== undefined)

        return (
            <Link to={`/task/${Task_Topic}`} className={`task-card`} state={{ courseId, Task_No, Task_Id, Task_Topic, Task_Content, Task_Status, Code_Link, Output_Link, Remarks }}>

                <div className="task-card-header">
                    <div className="task-number">{taskNumber}</div>
                    <div className="task-name">
                        {Task_Topic}
                    </div>
                </div>

                <div className="task-card-status">
                    {statusLabel}
                </div>

            </Link>
        );
    else {
        return (

            <div className={`task-card`} >
                <div className="task-card-header">
                    <div className="task-number">{taskNumber}</div>
                    <div className="task-name">
                        {Task_Topic}
                    </div>
                </div>

                <div className="task-card-status">
                    {statusLabel}
                </div>
                <div className="task-links-container">
                    {
                        Output_Link !== ''
                            ?
                            <a href={Output_Link} className={`task-links`} target='_blank' rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-rr-globe"></i>
                                </div>
                                <div className="text">
                                    Output
                                </div>
                            </a>
                            :
                            <div className={`task-links`} target='_blank' rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-rr-globe"></i>
                                </div>
                                <div className="text">
                                    Output
                                </div>
                            </div>

                    }
                    {
                        Code_Link !== ''
                            ?
                            <a href={Code_Link} className={`task-links`} target='_blank' rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-rr-file-code"></i>
                                </div>
                                <div className="text">
                                    Code
                                </div>
                            </a>
                            :
                            <div className={`task-links`} target='_blank' rel="noreferrer">
                                <div className="icon">
                                    <i className="fi fi-rr-file-code"></i>
                                </div>
                                <div className="text">
                                    Code
                                </div>
                            </div>

                    }
                </div>

            </div>
        )
    }
}
