import React, { useState } from 'react'
import TaskContext from './taskContext'

export default function TaskState({ children }) {


    const initialTasks = [
        {
            id: 1,
            name: "Create a heading and a paragraph",
            desc: "Create a mini blog using h1 tag and p tag.",
            date: Date.now(),
            solution: '',
            status: 'pending'
        },
        {
            id: 2,
            name: "Create a heading and a paragraph",
            desc: "Create a mini blog using h1 tag and p tag.",
            solution: 'github.io/myRepo/ATPLC',
            date: Date.now(),
            status: 'verified'
        },
        {
            id: 3,
            name: "Create a heading and a paragraph",
            desc: "Create a mini blog using h1 tag and p tag.",
            solution: 'github.io/myRepo/ATPLC',
            date: Date.now(),
            status: 'pending'
        }
    ]
    const [taskState, setTaskState] = useState(initialTasks);

    return (
        <TaskContext.Provider value={{ taskState, setTaskState }}>
            {children}
        </TaskContext.Provider>
    )
}
