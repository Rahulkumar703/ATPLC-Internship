import './Events.css';

export default function Events() {
    return (
        <section className='page events-page'>
            <div className="page-heading">
                <h2>Events</h2>
            </div>
            <div className="page-body">
                <div className="events-container">
                    <a className="events" href="https://docs.google.com/forms/d/e/1FAIpQLSfjyeDMl1fV7-zzX723MU7wvkXOEP1MnX7CAYOdQ2HoPXJ_fA/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className="events-image">
                            <img src="/Assets/Illustrator/Seminar.png" alt="seminar" />
                        </div>
                        <div className="events-text">
                            Skill Enhancement seminar Feedback
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
