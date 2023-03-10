import styled from "styled-components";
import CartItem from "../CartItem/CartItem";
import OrderSummary from "../orderSummary/orderSummary";

const ShopWrapper = styled.div`
    padding: 2rem 0;
    background-color: #EAEAEA;
    margin: auto;
`

const Cart = ({ cart, setCart, total, setTotal }) => {
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
                <div className="emptyBag">
                    <h3 className="conditionalDiv">Your bag is empty!</h3>
                </div>}
        </ShopWrapper>
    )
}

export default Cart;