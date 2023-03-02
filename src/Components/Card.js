import React, { useEffect, useState } from 'react'
import './Card.css'
import CircularProgress from './CircularProgress'

export default function Card({ heading, icon, obtainedScore, totalScore }) {
    const [overallPercentage, setOverallPercentage] = useState(0);
    useEffect(() => {

        setOverallPercentage((obtainedScore / totalScore * 100).toFixed(1));

    })

    return (
        <div className='card col'>
            <div className="card-top">
                <div className="icon">
                    <span className="material-symbols-rounded">
                        {icon}
                    </span>
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
