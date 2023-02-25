// import React, { useContext } from 'react'
// import userContext from '../Context/User/userContext';
import './LogInWithGithub.css'
// import { auth, provider, signInWithPopup } from '../Firebase/config'
import axios from 'axios';
import { useEffect } from 'react';

export default function LogInWithGithub() {

    useEffect(() => {
        console.log(process.env.GITHUB_CLIENT_ID);
        const params = new URLSearchParams(window.location.search)
        let code = params.get('code')
        console.log(code);
        if (code) {

            const data = getData(code);

            console.log(data);
        }
    })

    const getData = async (code) => {
        const url = "https://atplc20.pythonanywhere.com/github-login";
        try {
            const response = await axios.post(url, { auth_token: code })
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <a href='https://github.com/login/oauth/authorize?client_id=090bc39471397c0d7bff' className="login-button">
            <div className="icon">
                <span className="material-symbols-rounded">
                    login
                </span>
            </div>
            <div className="text">Log In</div>
        </a>
    )
}
