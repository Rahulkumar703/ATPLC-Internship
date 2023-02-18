
export const initialUser = {
    isLoggedIn: true,
    user: {
        name: "Devil",
        rollno: "FS58",
        tasks: [
            {
                no: 1,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                date: Date.now(),
                solution: 'github.io/myRepo/ATPLC',
                isPending: false,
            },
            {
                no: 2,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                solution: 'github.io/myRepo/ATPLC',
                date: Date.now(),
                isPending: false,
            },
            {
                no: 3,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                solution: 'github.io/myRepo/ATPLC',
                date: Date.now(),
                isPending: false,
            },
            {
                no: 4,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                solution: 'github.io/myRepo/ATPLC',
                date: Date.now(),
                isPending: true,
            },
            {
                no: 5,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                solution: '',
                date: Date.now(),
                isPending: false,
            },
            {
                no: 6,
                name: "Create a heading and a paragraph",
                desc: "Create a mini blog using h1 tag and p tag.",
                solution: '',
                date: Date.now(),
                isPending: false,
            },
            {
                no: 7,
                name: "Create a blog website",
                desc: "Create a blog website where more than one page interlinks with each other.",
                solution: '',
                date: Date.now(),
                isPending: true,
            }
        ]
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, isLoggedIn: true }
        case "LOG_OUT":
            return { ...state, isLoggedIn: false }
        case "UPDATE_SOLUTION":
            return { ...state, tasks: { ...state.tasks, solution: action.payload } }
        default:
            return state;
    }
}

export default userReducer;