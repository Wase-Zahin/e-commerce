import { useEffect, useState } from "react";
import styled from "styled-components";

const ShopWrapper = styled.div`
    display: grid;
    margin: auto;
    max-width: 1200px;
    grid-template-columns: auto; 
    padding: 1.5rem;
    gap: 4rem;
    background-color: #EAEAEA;
`
const CartItem = ({ cartItem, cart, setCart }) => {


    const handleInputChange = (e) => {

    }

    return (
        <ShopWrapper>
            <div className="cartItems">
                <img src={cartItem.image} alt={cartItem.title} className="pic"></img>
                <div className="itemDetailsDiv">
                    <h3 className="itemTitle">{cartItem.title}</h3>
                    <div className="itemDetails">
                        <div>
                            <h4>Item Category</h4>
                            <p>{cartItem.category}</p>
                        </div>

                        <div>
                            <h4>Price</h4>
                            <p>{cartItem.price}</p>
                        </div>

                        <div className="quantity">
                            <h4>Quantity</h4>
                            <input
                                type="number"
                                name="counter"
                                value={cartItem.counter}
                                onChange={(e) => handleInputChange(e)}
                            ></input>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>

        </ShopWrapper>
    )
}

export default CartItem;