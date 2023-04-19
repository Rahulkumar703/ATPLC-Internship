import React, { useEffect } from 'react'
import './Error.css'

export default function Error({ error }) {

    useEffect(() => {
        document.title = `ATPLC | Page not Found`
        document.getElementsByTagName("META")[2].content = 'The Page you are looking for is not found.'
        window.scrollTo(0, 0);
    }, [])

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
