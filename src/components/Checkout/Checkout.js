import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Checkout.css";

const stripePromise = loadStripe('pk_test_51Mk0utA80Tij0bnPXMSHBBOBk5CYgfdgSv0aMyzNQIIL5nucQLtSZUTFeX1PedqFOjD34KnrH8gEYN3i7fdCc7cH00Eawy3yUL');

const CheckoutForm = ({ total }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(total);
    }, [total]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: window.location.href + '/status',
            },
          });
        setIsSubmitting(false);

        if (error) {
            setErrorMessage(error.message);
        } else {
            setIsSubmitted(true);
            navigate.push('/status'); // navigate to success page
        }
    };

    return (
        <form className='checkoutForm' onSubmit={handleSubmit}>
            <PaymentElement />
            <button className='Btn' disabled={isSubmitting}>
                {isSubmitting ? `Pay $${total}...` : `Pay $${total}`}
            </button>
            {isSubmitted && <p className='SuccessMsg'>Payment successful!</p>}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

const Checkout = ({ total }) => {
    const [clientSecret, setClientSecret] = useState(null);

    const fetchPaymentIntent = async () => {
        const response = await fetch('https://zahin0100.pythonanywhere.com/api/create_payment/');
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
                    <CheckoutForm total={total}/>
                </Elements>
            )}
        </>
    );
};

export default Checkout;
