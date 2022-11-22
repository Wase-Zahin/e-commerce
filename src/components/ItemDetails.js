import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Increment from '../actions'

const ShopWrapper = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto;
    padding: 2.5rem;
    background-color: #EAEAEA;
`
const ShopContainer = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    padding: 1.5rem;
    background-color: white;
    box-shadow: 2.5px 1px 5px #393E46;
`

const Item = ({ setCart, cart }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchItem();
    }, []);

    const { id } = useParams();
    const [item, setItem] = useState([]);

    const addToCart = () => {
        let newItem = item;
        // wrap the cart object into an array []
        if (cart.length < 1) setCart([item])
        // if item already exists increment counter
        else if (cart.length > 0 && cart.includes(item)) {
            item.counter += 1;
        }
        else (setCart(item => [...item, newItem]))
    }


    const fetchItem = async () => {
        const data = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        const item = await data.json();
        // initialize counter of items
        item.counter = 1;
        setItem(item);
    }

    return (
        <ShopWrapper>
            <ShopContainer>
                <div className="imgDiv">
                    <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                    <h1>{item.title}</h1>
                    <h2>${item.price}</h2>
                    <p>{item.description}</p>
                    <div className="cartQuantityDiv">
                        <div className="quantityDiv">
                            <h2>Quantity</h2>
                            <div className="quantity">
                                <h2>-</h2>
                                <h2>0</h2>
                                <h2>+</h2>
                            </div>
                        </div>
                        <button onClick={addToCart} className="Btn">Add To Cart</button>
                    </div>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Item;