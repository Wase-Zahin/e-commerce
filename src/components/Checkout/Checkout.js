import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import "./Checkout.css";

const stripePromise = loadStripe('pk_test_51Mk0utA80Tij0bnPXMSHBBOBk5CYgfdgSv0aMyzNQIIL5nucQLtSZUTFeX1PedqFOjD34KnrH8gEYN3i7fdCc7cH00Eawy3yUL');

const CheckoutForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className='checkoutForm'>
            <PaymentElement />
            <button onClick={handleSubmit} className='Btn'>Submit</button>
        </form>
    );
};

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState(null);

    const fetchPaymentIntent = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/create_payment/');
        const { client_secret } = await response.json();
        setClientSecret(client_secret);
    };

    useEffect(() => {
        fetchPaymentIntent();
    }, []);

    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default Checkout;
