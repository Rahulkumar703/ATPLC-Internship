import React, { useEffect } from 'react'
import '../CommonPage.css'
import './Home.css'
import OurExperties from '../../Components/OurExperties/OurExperties'
import Hero from '../../Components/Hero/Hero'
import Feedback from '../../Components/Feedback/Feedbacks'
import PageStatics from '../../Components/PageStatics/PageStatics'


function Home(props) {
    useEffect(() => {
        document.title = `ATPLC | Home`
        document.getElementsByTagName("META")[2].content = 'ATPLC is Technical and Practical Learning Club. It Provides a variety of course with one on one doubt resolution and internship within guidence of experts.'
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
