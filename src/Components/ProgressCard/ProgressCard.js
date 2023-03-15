import React, { useEffect, useState } from 'react'
import './ProgressCard.css'
import CircularProgress from '../CircularProgress/CircularProgress'

export default function ProgressCard({ heading, icon, obtainedScore, totalScore }) {
    const [overallPercentage, setOverallPercentage] = useState(0);

    useEffect(() => {
        setOverallPercentage((obtainedScore / totalScore * 100).toFixed(1));
    }, [obtainedScore, totalScore])

    return (
        <div className='card col'>
            <div className="card-top">
                <div className="icon">
                    <i className={icon}></i>
                </div>
            </div>
            <div className="card-middle row">
                <div className="middle-left-part col">
                    <div className="card-heading">
                        <h3>{heading}</h3>
                    </div>
                    <div className="card-score">
                        <span>{obtainedScore}</span>
                        /
                        <span>{totalScore}</span>
                    </div>
                </div>
                <div className="middle-right-part">
                    <CircularProgress width="100" percentage={overallPercentage} />
                </div>
            </div>

        </div>
    )
}
