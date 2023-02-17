import React, { useReducer } from 'react'
import UserContext from './userContext'
import userReducer, { initialUser } from './userReducer'

const UserState = (props) => {
    const [userState, dispatch] = useReducer(userReducer, initialUser);
    return (
        <UserContext.Provider value={{ userState, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
