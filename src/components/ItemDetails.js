import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

const ShopWrapper = styled.div`
    height: fit-content;
    width: fit-content;
    margin: auto;
    padding: 2.5rem;
`
const ShopContainer = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    padding: 1.5rem;
`

const Item = () => {
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
                    <div className="quantity">
                        <h2>Quantity</h2>
                        <h2>0</h2>
                    </div>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Item;