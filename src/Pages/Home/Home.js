import React, { useEffect } from 'react'
import '../CommonPage.css'
import './Home.css'
import OurExperties from '../../Components/OurExperties/OurExperties'
import Hero from '../../Components/Hero/Hero'
import Feedback from '../../Components/Feedback/Feedback'
import PageStatics from '../../Components/PageStatics/PageStatics'


function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <section className='page home-page'>
            <Hero />
            <OurExperties />
            <PageStatics />
            <Feedback />
        </section >
    )
}

export default Home
