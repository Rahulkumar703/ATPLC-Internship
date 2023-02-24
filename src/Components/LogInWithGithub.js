import React, { useContext } from 'react'
import userContext from '../Context/User/userContext';
import './LogInWithGithub.css'
import { auth, provider, signInWithPopup } from '../Firebase/config'
import axios from 'axios';


export default function LogInWithGithub() {
    const { setUserState } = useContext(userContext);

    const getRestData = async (email) => {
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${email}`)
            const data = res.data.items;
            if (data.length) {
                const user = data[0];
                console.log(data);
                return { username: user.login, githubProfile: user.html_url, }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const logIn = async () => {

        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const { username, githubProfile, } = await getRestData(user.email);
            console.log(githubProfile);
            setUserState({
                id: username,
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                profileImg: user.photoURL,
                githubProfile: githubProfile
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <button className="login-button" onClick={logIn}>
            <div className="icon">
                <span className="material-symbols-rounded">
                    login
                </span>
            </div>
            <div className="text">Log In</div>
        </button>
    )
}
