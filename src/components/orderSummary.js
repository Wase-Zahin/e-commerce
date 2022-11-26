import { useState, useEffect } from "react";

const OrderSummary = ({ cart }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        cartTotal();
    }, [cart]);

    const cartTotal = () => {
        let total = 0;
        cart.map((cartItem) => {
            total += cartItem.price * cartItem.counter;
            return setTotal(total);
        })
    };

    return (
        <div className="orderSummary">
            <h2>ORDER SUMMARY</h2>
            <hr></hr>
            <div className="checkout">
                <div>
                    <p>Item Subtotal</p>
                    <h2>${total}</h2>
                </div>

                <div>
                    <p>Shipping</p>
                    <h2>$10</h2>
                </div>

                <div>
                    <p>Estimated Subtotal</p>
                    <h2>${total + 10}</h2>
                </div>
            </div>
            <button type="button" className="Btn"> Checkout </button>
        </div>
    )
}

export default OrderSummary;