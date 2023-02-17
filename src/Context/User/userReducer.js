
export const initialUser = {
    isLoggedIn: true,
    user: {
        name: "Devil",
        rollno: "FS58",
        submittedTask: 2,
        pendingTasks: 1
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, isLoggedIn: true }
        case "LOG_OUT":
            return { ...state, isLoggedIn: false }
        default:
            return state;
    }
}

export default userReducer;