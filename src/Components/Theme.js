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
                    <span className="material-symbols-outlined icon" onClick={setLightTheme}>
                        light_mode
                    </span >
                    :
                    <span className="material-symbols-outlined icon" onClick={setDarkTheme}>
                        dark_mode
                    </span>
            }
        </div >
    )
}
