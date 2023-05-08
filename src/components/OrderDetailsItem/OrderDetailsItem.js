import React from 'react';
import './OrderDetailsItem.css';

export default function OrderDetailsItem() {
    return (
        <div className="order-details__item-container">
            <img
                className="order-details__item-image"
                src="https://via.placeholder.com/150"
                alt="Product"
            />
            <div className="order-details__item-text">
                <span className="order-details__item-name">Product Name</span>
                <span className="order-details__item-price">$99.99</span>
                <span className="order-details__item-quantity">Qty: 1</span>
            </div>
        </div>
    )
}
