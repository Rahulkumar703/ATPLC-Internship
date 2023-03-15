import React, { useEffect } from 'react'
import '../CommonPage.css'
import './Home.css'
import OurExperties from '../../Components/OurExperties/OurExperties'
import Hero from '../../Components/Hero/Hero'
import Feedback from '../../Components/Feedback/Feedback'

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
