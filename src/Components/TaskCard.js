import React, { useState } from 'react'
import SubmitSolution from './SubmitSolution';
import './TaskCard.css'

export default function TaskCard({ Task_No, Task_Topic, Task_Content, Task_Status, submissionLink }) {

    // console.log(submissionLink);
    // console.log(status);

    return (
        <div className={`task-card`}>

            <div className="top row">
                <div className="left">
                    <div className="task-number">{Task_No < 10 ? ` 0${Task_No}` : Task_No}</div>
                </div>
                <div className="right col">
                    <div className="task-name">
                        {Task_Topic}
                    </div>
                </div>
            </div>

            <div className="middle">
                <div className="task-description">{Task_Content}</div>
            </div>

            <div className="bottom col" >
                <div className="status">
                    {
                        submissionLink === ''
                            ?
                            <div className="status-label danger row">
                                <div className="icon">
                                    <span className="material-symbols-rounded">
                                        report
                                    </span>
                                </div>
                                <div className="text">Not Submitted</div>
                            </div>
                            :
                            Task_Status === "Under Review" ?
                                <div className="status-label pending row">
                                    <div className="icon">
                                        <span className="material-symbols-rounded">
                                            schedule
                                        </span>
                                    </div>
                                    <div className="text">Under Review</div>
                                </div>
                                :
                                <div className="status-label success row">
                                    <div className="icon">
                                        <span className="material-symbols-rounded">
                                            verified
                                        </span>
                                    </div>
                                    <div className="text">Verified</div>
                                </div>
                    }
                </div>

            </div>
            <div className="label">Recent Task</div>
        </div>
    )
}
