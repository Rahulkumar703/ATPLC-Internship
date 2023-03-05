import React from 'react'
import './Error.css'

export default function Error({ error }) {
    console.log(error);
    return (

        <div className="error-message">
            <div className="icon">
                <span className="material-symbols-rounded">
                    cloud_off
                </span>
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
