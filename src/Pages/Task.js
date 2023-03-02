import React from 'react'
import './Task.css'

export default function Task({ Task_No, Task_Topic, Task_Content, Task_Status, submissionLink, Remarks }) {
    return (
        <div className='page task-page'>
            <h1>Task Page</h1>
            <h1>{Task_No}</h1>
        </div>
    )
}
