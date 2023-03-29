import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../CommonPage.css'
import './Enroll.css'
import Input from '../../Controller/Input/Input'
import Button from '../../Components/Button/Button'

export default function Enroll() {
    const location = useLocation();
    const { id, courseName, courseDuration, coverImage, couresPrice, courseTechnologies } = location?.state;
    const [message, setMessage] = useState('');
    const [isloading, setIsloading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorPay = async (e) => {
        e.preventDefault();
        setIsloading(true);
        if (user.name === '' || user.email === '' || user.message === '') {
            setMessage('Please fill all details')
        }
        else if (user.password !== user.confirmPassword) {
            setMessage('Password not mathced');
        }
        else {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                setMessage("Razorpay SDK failed to load. Are you online?");
                return;
            }

            // creating a new order
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/course-order`, { amount: couresPrice * 100 });

            if (!result) {
                setMessage("Server error. Are you online?");
                return;
            }

            // Getting the order details back
            const { amount, order_id, currency } = result.data;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_API, // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "ATPLC",
                description: "Test Transaction",
                image: 'https://www.atplc.in/Assets/Images/atplc_logo.png',
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_paymentId: response.razorpay_payment_id,
                        razorpay_orderId: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        Name: user.name,
                        Email: user.email,
                        Password: user.password,
                        courseId: id,
                        courseName,
                    };
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/payment-success`, data);

                    console.log(result.data);

                    setMessage(result.data.res);
                },
                notes: {
                    courseId: id,
                    courseName,
                    name: user.name,
                    email: user.email,
                    date: Date.now()
                },
                theme: {
                    color: "#9c394b",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        setIsloading(false);
    }

    const handelChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <section className='page enroll-page'>
            <div className="page-heading">
                <h3>Enroll Course</h3>
            </div>


            <div className="page-content">


                <div className="course-details">

                    <div className="course-header">
                        <div className='cover-image'>
                            {
                                coverImage && coverImage !== '/media/' ?
                                    <img src={`${process.env.REACT_APP_BACKEND_PATH}${coverImage}`} alt="course thumbnail" />
                                    :
                                    <div className='cover-default-image'> {'</>'}</div>
                            }
                        </div>
                        <div className="course-name">
                            <h4>{courseName}</h4>
                        </div> <div className="course-price-duration">
                            {
                                (couresPrice !== null) ?
                                    <div className="course-price">
                                        <div className="icon">
                                            <i className="fi fi-rr-indian-rupee-sign"></i>
                                        </div>
                                        <div className="text">
                                            {couresPrice}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                courseDuration !== 0 ?
                                    <div className="course-duration">
                                        <div className="icon">
                                            <i className="fi fi-rr-hourglass-start"></i>
                                        </div>
                                        <div className="text">
                                            {courseDuration} Month
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <div className="course-body">
                        {
                            courseTechnologies &&
                            <div className="course-technologies">
                                <div className="technologies-heading">
                                    <h4>Course Technologies</h4>
                                </div>
                                <div className="technologies-body">
                                    {
                                        courseTechnologies.split(',').map((tech, index) => {
                                            return <span key={index} className="techs">{tech}</span>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>



                <form onSubmit={displayRazorPay} className="payment-form">
                    <div className="form-container">
                        {message !== '' && <div className="message-box">{message}</div>}
                        <Input type="text" label={'Full Name'} id='name' name='name' icon={'fi fi-rr-user'} value={user.name} onChange={handelChange} />
                        <Input type="email" label={'Email'} id='email' name='email' icon={'fi fi-rr-envelope'} value={user.email} onChange={handelChange} />
                        <Input type="password" label={'Password'} id='password' name='password' icon={'fi fi-rr-key'} value={user.password} onChange={handelChange} />
                        <Input type="password" label={'Confirm Password'} id='confirmPassword' name='confirmPassword' icon={'fi fi-rr-key'} value={user.confirmPassword} onChange={handelChange} />
                        <Button label="Enroll Now" icon={"fi fi-rr-wallet"} type="submit" isLoading={isloading} />
                    </div>
                </form>
            </div>
        </section>
    )
}
