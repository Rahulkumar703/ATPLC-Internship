import React from 'react'
import './Loader.css'

export default function Loader() {
    return (
        <div className='loader-wraper'>
            <h2 className='loader-text'>
                Loading ...
            </h2>
            <div className='loader'>
            </div>
        </div>
    )
}
