
export const initialUser = {
    isLoggedIn: true,
    user: {
        name: "Devil",
        rollno: "FS58",
        totalTasks: 20,
        submittedTasks: 14,
        pendingTasks: 6,
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