import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../CommonPage.css'
import './Gallery.css'

export default function Gallery() {

    useEffect(() => {
        document.title = `ATPLC | Gallery`
        document.getElementsByTagName("META")[2].content = 'ATPLC is Technical and Practical Learning Club. It Provides a variety of course with one on one doubt resolution and internship within guidence of experts.'
        window.scrollTo(0, 0);
    }, [])


    return (
        <section className='page gallery-page'>
            <div className="icon">
                <i className="fi fi-rr-snowplow"></i>
            </div>
            <div className="main-error">
                <h1>Under Construction</h1>
            </div>
            <div className="sub-error">
                <h1>Comming Soon </h1>
            </div>
            <Link to='/'>
                <div className="icon">
                    <i className="fi fi-rr-home"></i>
                </div>
                <div className="text">Home</div>
            </Link>
        </section>
    )
}
