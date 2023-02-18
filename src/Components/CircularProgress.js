import React from 'react'
import './CircularProgress.css'

export default function CircularProgress({ width, percentage }) {
    const radius = (width / 2) - 5;
    const stroke = (width / 12);
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
        <div className="circular-progress-bar">
            <svg
                width={width}
                height={width}
                viewBox={`0 0 ${width} ${width}`}
            >
                <circle
                    className='circle-background'
                    cx={width / 2}
                    cy={width / 2}
                    strokeWidth={stroke}
                    r={radius} />
                <circle
                    className='circle-progress'
                    cx={width / 2}
                    cy={width / 2}
                    strokeWidth={stroke}
                    r={radius}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform={`rotate(-90 ${width / 2} ${width / 2})`} />
            </svg>
            <span className='progress-percentage'>{percentage}%</span>
        </div>
    )
}
