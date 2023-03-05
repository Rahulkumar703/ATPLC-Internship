import React from 'react'
import './Error.css'

export default function Error({ message }) {
    return (

        <div className="error-message">
            <div className="icon">
                <span className="material-symbols-rounded">
                    signal_disconnected
                </span>
            </div>
            <div className="text">
                {message}
            </div>
        </div>
    )
}
