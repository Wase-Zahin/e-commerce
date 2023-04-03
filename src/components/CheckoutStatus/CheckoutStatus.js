import React from 'react';
import './CheckoutStatus.css'
import { IoMdCheckmarkCircle } from 'react-icons/io'

const CheckoutStatus = () => {
    return (
        <div className='checkoutStatus'>
            <div className='checkoutMessage'>
                <IoMdCheckmarkCircle className='doneIcon' />
                <div>
                    <h1>Payment successful!</h1>
                    <p>Thank you for your purchase.</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutStatus;