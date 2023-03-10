import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.css';

export default function TaskCard({ sub, courseId, Task_No, Task_Topic, Task_Content, Task_Status, Code_Link, Remarks }) {

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

    return (
        <Link to={`/task/${Task_Topic}`} className={`task-card`} state={{ courseId, Task_No, Task_Topic, Task_Content, Task_Status, Code_Link, Remarks }}>

            <div className="top row">
                <div className="left">
                    <div className="task-number">{taskNumber}</div>
                </div>
                <div className="right col">
                    <div className="task-name">
                        {Task_Topic}
                    </div>
                </div>
            </div>

            <div className="bottom col">
                <div className="status">
                    {statusLabel}
                </div>

            </div>
        </Link>
    );
}
