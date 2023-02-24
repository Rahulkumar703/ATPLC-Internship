import React, { useState } from 'react'
import UserContext from './userContext'

const UserState = (props) => {
    const [userState, setUserState] = useState({});

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
