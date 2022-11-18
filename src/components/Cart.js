import styled from "styled-components";
import { useSelector } from "react-redux";

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

const Cart = () => {
    const counter = useSelector(state => state.Counter);
    return (
        <ShopWrapper>
            <h1 className="cartHeader">Shopping Cart {counter}</h1>
            <div className="hr"></div>
            <ShopContainer>
                <div className="cartItems">
                    <img src="" className="pic"></img>
                    <div className="itemDetailsDiv">
                        <h2 className="itemTitle">Here will be item Title</h2>
                        <div className="itemDetails">
                            <div>
                                <h3>Item Category</h3>
                                <p>Men's Clothing</p>
                            </div>

                            <div>
                                <h3>Price</h3>
                                <p>$69</p>
                            </div>

                            <div>
                                <h3>Quantity</h3>
                                <p>- 0 +</p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="orderSummary">
                    <h2>ORDER SUMMARY</h2>
                    <hr></hr>
                    <div className="checkout">
                        <div>
                            <p>Item Subtotal</p>
                            <h2>$263</h2>
                        </div>

                        <div>
                            <p>Shipping</p>
                            <h2>$46</h2>
                        </div>

                        <div>
                            <p>Estimated Subtotal</p>
                            <h2>$299</h2>
                        </div>
                    </div>
                    <button type="button" className="Btn"> Checkout </button>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Cart;