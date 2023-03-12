import React from 'react'
import './Error.css'

export default function Error({ error }) {
    return (

        <div className="error-message">
            <div className="icon">
                <i className="fi fi-rr-wifi-exclamation"></i>
            </div>
            <div className="text">
                {error?.response?.statusText || error.message}
            </div>
            <div className="status-code">
                {error?.response?.status || 408}
            </div>
        </div>
    )
}
