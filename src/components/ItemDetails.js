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

const Item = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchItem();
    }, []);

    const { id } = useParams();
    const [item, setItem] = useState([]);

    const fetchItem = async () => {
        const data = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        const item = await data.json();
        console.log(item);
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
                    <div className="quantityDiv">
                        <h2>Quantity</h2>
                        <div className="quantity">
                            <h2>-</h2>
                            <h2>0</h2>
                            <h2>+</h2>
                        </div>
                    </div>
                    <button onClick={() => dispatch(Increment())} className="Btn">Add To Cart</button>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Item;