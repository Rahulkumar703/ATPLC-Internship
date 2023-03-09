import React, { useEffect, useState } from 'react'
import './Feedback.css'

const feedback = [
    {
        id: 1,
        name: "Yash Kashyap",
        img: "/Assets/Images/yash.jpg",
        batch: "ECE 2019",
        college: "MCE Motihari",
        designation: "Trainee",
        review: "This club helped me a lot in learning Coding and web development from the very beginning to a good level. It helped me to enhance my knowledge in both the front end and backend. Atul sir, the founder of the club is very supportive and helps all a lot. I would like to thank this club for providing such quality content & knowledge to me & all."
    },
    {
        id: 2,
        name: "Pratibha Anand",
        img: "/Assets/Images/pratibha.jpg",
        batch: "CSE, 2019",
        college: "MCE Motihari",
        designation: "Trainee",
        review: "I am very thankful for the skills that I had learned from this club. From this club, I got deep knowledge of web development as well as coding. The thing I liked most about the club is as the name suggests i.e. Practical Learning. Practical learning enhances our skills. ATPLC provides me an easy path to jump in and begin learning practically. Atul sir, the initiator of our club helped to gain those skills by giving his precious time. Thank you..."
    },
    {
        id: 3,
        name: "Aman Kumar",
        img: "/Assets/Images/aman20.jpg",
        batch: "EEE, 2020",
        college: "MCE Motihari",
        designation: "Trainee",
        review: "ATPLC club helped me to grab continuously knowledge. Here, Atul sir helps to improve programming skills and learn how to create logic. I joined the alternate session, practiced so many questions and also real-world problems. Now I can create software and am able to good coding in an impressive way. According to my opinion, practical knowledge is most important. Sir guide us, cleared doubts, and also sort out errors during the session. Sir motivate us and told us about coding is a good career because there is an opportunity, and much of that opportunity is well-paid. I think this platform is very helpful for beginners. Thank you so much, sir"
    },
    {
        id: 4,
        name: "Divya Kumari",
        img: "/Assets/Images/divya.jpg",
        batch: "ECE, 2019",
        college: "GCE West Champaran",
        designation: "Trainee",
        review: "ATPLC is a practical learning club. It provides regular classes for practical learning in different fields like web development, android development, c language, object- oriented programming, data structure, etc.I joined ATPLC a few months ago.Now, I can create a website as well as able to good coding.And the credit for all these goes to ATPLC.I got more benefit from this club.As an engineer, practical experience is most important.Thank you Atul sir for providing us learning platform like ATPLC."
    },
    {
        id: 5,
        name: "Rahul Kumar",
        img: "/Assets/Images/rahul.jpg",
        batch: "CSE, 2021",
        college: "MCE Motihari",
        designation: "Intern",
        review: "I Worked on react during my internship in ATPLC. I learned a lot of new thing about react during this.  "
    },
]

export default function Feedback() {

    const [activeFeed, setActiveFeed] = useState(0);

    const updateActiveFeed = (target) => {
        if (target < feedback.length && target >= 0) {
            setActiveFeed(target);
        }
        else if (target >= feedback.length) {
            setActiveFeed(0);
        }
        else
            setActiveFeed(feedback.length - 1)
    }
    useEffect(() => {
        const timer = setInterval(() => {
            updateActiveFeed(activeFeed + 1)
        }, 1000);

        return clearInterval(timer)
    }, [])

    return (
        <section className='feedback-section'>
            <div className="section-heading">
                <h2>Student's Feedback</h2>
            </div>
            <div className="section-body">
                <div className="left-button" onClick={() => updateActiveFeed(activeFeed - 1)}>{'<'}</div>
                <div className="feedback-card">
                    <div className="card-heading">
                        <div className="image">
                            {feedback[activeFeed].img ? <img src={feedback[activeFeed].img} alt="avatar" loading='lazy' /> : 'avatar'}
                        </div>
                        <div className="heading-details">
                            <h4 className="name">{feedback[activeFeed].name}</h4>
                            <span className="batch">{feedback[activeFeed].batch}</span>
                            <span className="college">{feedback[activeFeed].college}</span>
                            <span className="designation">{feedback[activeFeed].designation}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <img className='quote' src="/Assets/Images/quote-start.png" alt="quote" />
                        <p className="review">{feedback[activeFeed].review}</p>
                        <img className='quote' src="/Assets/Images/quote-end.png" alt="quote" />
                    </div>
                </div>
                <div className="right-button" onClick={() => updateActiveFeed(activeFeed + 1)}>{'>'}</div>
            </div>
        </section>
    )
}
