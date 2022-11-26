import styled from "styled-components";
import CartItem from "./CartItem";
import OrderSummary from "./orderSummary";

const ShopWrapper = styled.div`
    padding: 2rem 0;
    background-color: #EAEAEA;
    margin: auto;
`
const ShopContainer = styled.main`
    margin: auto;
    display: grid;
    max-width: 1200px;
    grid-template-columns: 2fr 1fr;
    padding: 1.5rem;
    gap: 1rem;
`

const Cart = ({ cart, setCart }) => {
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
        <ShopWrapper>
            {cart.length > 0 ?
                <ShopContainer>
                    <div>
                        {cartItems}
                    </div>
                    <OrderSummary cart={cart}>
                    </OrderSummary>
                </ShopContainer> :
                <div className="emptyBag">
                    <h3 className="conditionalDiv">"Your bag is empty!"</h3>
                    </div>}
        </ShopWrapper>
    )
}

export default Cart;