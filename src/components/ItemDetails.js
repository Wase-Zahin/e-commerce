import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

const ShopWrapper = styled.div`
    padding: 2.5rem;
    background-color: #EAEAEA;
`
const ShopContainer = styled.main`
    display: grid;
    margin: auto;
    max-width: 1200px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    padding: 1.5rem;
    gap: 1rem;
    background-color: white;
    box-shadow: 2.5px 1px 5px #393E46;
`

const Item = ({ cart, setCart }) => {
    useEffect(() => {
        fetchItem();
    }, []);

    const { id } = useParams();
    const [item, setItem] = useState([]);

    const addToCart = () => {
        let newItem = item;
        // wrap the cart object into an array []
        if (cart.length < 1) {
            setCart([item])
            item.counter = 1;
        }
        // if item already exists increment counter
        else if (cart.length > 0) {
            cart.map((cartItem) => {
                if (cartItem.id == item.id)
                    cartItem.counter += 1;
            })
        }
        else (setCart(item => [...item, newItem]))
    }

    const fetchItem = async () => {
        const data = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        const item = await data.json();
        // initialize counter of items
        setItem(item);
    }

    return (
        <ShopWrapper>
            <ShopContainer>
                <div className="imgDiv">
                    <img src={item.image} alt={item.title}></img>
                </div>
                <div className="item">
                    <h1>{item.title}</h1>
                    <h2>${item.price}</h2>
                    <p>{item.description}</p>
                    <button onClick={addToCart} className="Btn">Add To Cart</button>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Item;