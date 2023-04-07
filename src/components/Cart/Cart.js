import { useEffect } from "react";
import './Cart.css'
import CartItem from "../CartItem/CartItem";
import OrderSummary from "../orderSummary/orderSummary";

const Cart = ({ cart, setCart, total, setTotal }) => {

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    
    const cartItems = cart.map((cartItem) => {
        return (
            <CartItem
                id={cartItem.id}
                key={cartItem.id}
                cart={cart}
                setCart={setCart}
                cartItem={cartItem}
            ></CartItem>
        )
    })

    return (
        <div className="shopWrapper">
            {cart.length > 0 ?
                <div className="cartItemsDiv">
                    <div>
                        {cartItems}
                    </div>
                    <OrderSummary
                        cart={cart}
                        total={total}
                        setTotal={setTotal}>
                    </OrderSummary>
                </div> :
                <div className="emptyCart">
                    <h3 className="conditionalDiv">Your cart is empty!</h3>
                </div>}
        </div>
    )
}

export default Cart;