import React, { useState } from 'react'
import SubmitSolution from './SubmitSolution';
import './TaskCard.css'

export default function TaskCard({ isRecent, id, name, desc, date, status, solution }) {

    const newDate = new Date(date);

    const [cardToggle, setCardToggle] = useState(false);
    return (
        <div className={`task-card ${isRecent ? 'recent' : ''}`}>

            <div className="top row">
                <div className="left">
                    <div className="task-number">{id < 10 ? ` 0${id}` : id}</div>
                </div>
                <div className="right col">
                    <div className="task-name">
                        {name}
                    </div>
                    <div className="task-date row">
                        <div className="icon">
                            <span className="material-symbols-rounded">
                                calendar_month
                            </span>
                        </div>
                        <div className="text">{newDate.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="middle">
                <div className="task-description">{desc}</div>
            </div>

            <div className="bottom col" >
                <div className="status">
                    {
                        solution === ''
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
                            status === "pending" ?
                                <div className="status-label pending row">
                                    <div className="icon">
                                        <span className="material-symbols-rounded">
                                            schedule
                                        </span>
                                    </div>
                                    <div className="text">Verification Pending</div>
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
                <div className={`toogle-button row ${cardToggle ? 'active' : ''}`} onClick={() => { setCardToggle(!cardToggle) }}>
                    <div className="text">Submit Solution</div>
                    <div className="icon">
                        <span className="material-symbols-rounded">
                            expand_more
                        </span>
                    </div>
                </div>
                {
                    cardToggle
                    &&
                    < SubmitSolution id={id} value={solution} type="url" placeholder={`Ex - https://github.com/<your_username>/ATPLC-Training-Daily_Tasks`} />
                }

            </div>
            <div className="label">Recent Task</div>
        </div>
    )
}
