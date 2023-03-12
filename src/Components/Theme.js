import React, { useEffect, useState } from 'react'
import './Theme.css'

export default function Theme() {
    const [isDarkTheme, setIsDarkTheme] = useState(setTheme());

    function setTheme() {
        if (localStorage.getItem('isDarkTheme')) {
            return JSON.parse(localStorage.getItem('isDarkTheme'));
        }
        else return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    const setDarkTheme = () => {
        setIsDarkTheme(true);
        localStorage.setItem('isDarkTheme', true);
    }
    const setLightTheme = () => {
        setIsDarkTheme(false);
        localStorage.setItem('isDarkTheme', false);
    }


    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark');
        }
        else document.body.classList.remove('dark');
    }, [isDarkTheme])


    return (
        <div className="theme">
            {
                isDarkTheme ?
                    <span className="icon" onClick={setLightTheme}>
                        <i className="fi fi-rr-clouds-sun"></i>
                    </span>
                    :
                    <span className="icon" onClick={setIsDarkTheme}>
                        <i className="fi fi-rr-clouds-moon"></i>
                    </span>
            }
        </div >
    )
}
