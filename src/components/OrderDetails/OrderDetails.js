import React, { useEffect } from 'react';
import './OrderDetails.css';
import OrderDetailsItem from '../OrderDetailsItem/OrderDetailsItem';

const OrderDetails = () => {
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        console.log(cart);
        
        const retrievedOrderedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];

        console.log(retrievedOrderedItems); // should print an array of objects
    });

    return (
        <div>
            <h2 className="order-details__title">Order Details</h2>
            <div className="order-details">
                <ul className="order-details__list">
                    <li className="order-details__item">
                        <OrderDetailsItem></OrderDetailsItem>
                    </li>
                    {/* Add more list items for other products in the order */}
                </ul>
                <div className="order-details__summary">
                    <p className="order-details__total">Total: $99.99</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
