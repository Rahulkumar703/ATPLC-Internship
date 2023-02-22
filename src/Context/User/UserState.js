import React, { useState } from 'react'
import UserContext from './userContext'

const UserState = (props) => {
    const initialUser = {
        id: "FS57",
        name: "Rahul",
        email: "rahulkumar703@outlook.com",
        course: "Full Stack",
        course_type: "training",
        tasks: [
            { id: 1, status: "pending", solution: "https://github.com" },
            { id: 3, status: "verified", solution: "https://github.com" },
        ]
    }
    const [userState, setUserState] = useState({});

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
