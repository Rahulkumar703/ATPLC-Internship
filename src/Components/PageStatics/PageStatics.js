import React, { useEffect, useRef, useState } from 'react'
import './PageStatics.css'

export default function PageStatics() {
    return (
        <section className='page-statics'>
            <div className="statics-box">
                <Counter number={3} label='Years of Establishment' icon="fi fi-rr-building" />
            </div>
            <div className="statics-box">
                <Counter number={100} label='Practical Sessions' icon="fi fi-rr-whistle" />
            </div>
            <div className="statics-box">
                <Counter number={100} label='Satisfied Students' icon="fi fi-rr-smile" />
            </div>
        </section>
    )
}


function Counter({ number, icon, label }) {

    const counterRef = useRef(null);

    const [counterNumber, setCounterNumber] = useState(0);

    useEffect(() => {

        const animateCounter = () => {
            const speed = Math.ceil(number / 50);
            if (counterNumber <= number) {
                setInterval(() => {
                    setCounterNumber((prev) => {
                        if (prev + speed <= number)
                            return prev + speed;
                        else return number
                    });
                }, 100);
            }
        }
        const observer = new IntersectionObserver((entries, observer) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;

            animateCounter();

            observer.unobserve(counterRef.current)

        }, {
            root: null,
            threshold: 0,
            rootMargin: '80% 0% -20% 0%',
        });
        observer.observe(counterRef.current)
    })


    return (
        <div className="counter" ref={counterRef}>
            <div className="icon">
                <i className={icon}></i>
            </div>
            <h4 className='counter-number'>{counterNumber}<span>+</span> </h4>
            <p className='counter-label'>{label}</p>
        </div>
    )
}
