import './LogInWithGithub.css'
import { Link } from 'react-router-dom';

export default function LogInWithGithub() {


    // const getData = async (code) => {
    //     const url = "https://atplc20.pythonanywhere.com/github-login";
    //     try {
    //         const response = await axios.post(url, { auth_token: code })
    //         return response.data;
    //     } catch (error) {
    //         return error;
    //     }

    // }

    return (
        <Link to='/login' className="login-button">
            <div className="icon">
                <span className="material-symbols-rounded">
                    login
                </span>
            </div>
            <div className="text">Log In</div>
        </Link>
    )
}
