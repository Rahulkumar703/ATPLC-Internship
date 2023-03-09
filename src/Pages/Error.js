import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CommonPage.css'
import './Error.css'

function Error() {
    const navigate = useNavigate();
    return (
        <section className='page error-page'>
            <div className="error-code">404</div>
            <div className="error-message">Page Not Found</div>
            <div className="navigation-buttton">
                <button onClick={() => navigate(-1)}>
                    <div className="icon">
                        <i className="fi fi-rr-arrow-small-left"></i>
                    </div>
                    <div className="text">Back</div>
                </button>
                <button onClick={() => { navigate('/') }}>
                    <div className="icon">
                        <i className="fi fi-rr-home"></i>
                    </div>
                    <div className="text">Home</div>
                </button >

            </div >
        </section >
    )
}

export default Error
