import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../CommonPage.css'
import './Enroll.css'
import logo from '../../Assets/logo.png'

export default function Enroll() {
    const [price, setPrice] = useState(500);
    const [message, setMessage] = useState('');

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
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            setMessage("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/course-order`, { amount: price * 100 });

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
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    razorpay_paymentId: response.razorpay_payment_id,
                    razorpay_orderId: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };
                const result = await axios.post(`${process.env.REACT_APP_BACKEND_PATH}/payment-success`, data);

                console.log(result);

                setMessage(result.data.msg);
            },
            prefill: {
                name: "Devil",
                email: "Devil@example.com",
                contact: "9876543210",
            },
            notes: {
                address: "Devil Corporate Office",
            },
            theme: {
                color: "#9c394b",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <section className='page enroll-page'>
            {message !== '' && <div className="message-box">{message}</div>}
            <form onSubmit={displayRazorPay}>
                <button type='submit'>Pay ₹{price}</button>
            </form>
        </section>
    )
}
