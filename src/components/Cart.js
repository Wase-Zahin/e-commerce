import styled from "styled-components";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";

const ShopWrapper = styled.div`
    margin: auto;
    padding: 1.5rem;
    background-color: #EAEAEA;
`
const ShopContainer = styled.main`
    display: grid;
    margin: auto;
    max-width: 1200px;
    grid-template-columns: auto; 
    padding: 1.5rem;
    gap: 4rem;
`

const Cart = ({ cart, setCart }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        cartTotal();
    }, [cart]);

    const cartItems = cart.map((cartItem) => {
        return (
            <CartItem
                key={cartItem.id}
                cart={cart}
                setCart={setCart}
                cartItem={cartItem}
            ></CartItem>
        )
    })

    const cartTotal = () => {
        let total = 0;
        cart.map((cartItem) => {
            total += cartItem.price * cartItem.counter;
            return setTotal(total);
        })
    };


    return (
        <ShopWrapper>
            <ShopContainer>
                <div>
                    {cartItems}
                </div>
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
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Cart;