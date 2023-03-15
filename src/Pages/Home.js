import React, { useEffect } from 'react'
import OurExperties from '../Components/OurExperties'
import Hero from '../Components/Hero'
import './CommonPage.css'
import './Home.css'
import Feedback from '../Components/Feedback'

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section className='page home-page'>
            <Hero />
            <OurExperties />
            <Feedback />
        </section >
    )
}

export default Home
