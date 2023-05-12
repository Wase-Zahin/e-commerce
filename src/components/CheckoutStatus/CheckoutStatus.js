import React, { useState, useEffect } from 'react';
import './CheckoutStatus.css'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const CheckoutStatus = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    const cart = localStorage.getItem('cart');

    useEffect(() => {
        // Set cart as an empty array
        localStorage.setItem('cart', JSON.stringify([]));

        // Start countdown timer
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Navigate to the homepage after countdown ends
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, countdown * 1000);

        // Cleanup function to clear timers
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate, countdown, cart]);

    return (
        <div className='checkoutStatus'>
            <div className='checkoutMessage'>
                <IoMdCheckmarkCircle className='doneIcon' />
                <div>
                    <h1>Payment successful!</h1>
                    <p>Thank you for your purchase.</p>
                    <p>Redirecting in {countdown}...</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutStatus;
