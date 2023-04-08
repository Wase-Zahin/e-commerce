import { useEffect } from "react";
import "./orderSummary.css";
import { Link } from "react-router-dom";

const OrderSummary = ({ cart, total, setTotal }) => {
    useEffect(() => {
        cartTotal();
    }, [cart]);

    const cartTotal = () => {
        let total = 0;
        cart.map((cartItem) => {
            total += (cartItem.price * cartItem.counter) + 10;
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
                <Link className="checkoutBtn" to="/cart/checkout">Checkout</Link>
        </div>
    )
}

export default OrderSummary;