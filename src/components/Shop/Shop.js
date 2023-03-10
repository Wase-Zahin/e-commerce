import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import "./Shop.css";

const ShopWrapper = styled.div`
    padding: 2.5rem;
    background-color: #EAEAEA;
`
const ShopContainer = styled.main`
    display: grid;
    max-width: 1200px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    margin: auto;
    gap: 2rem;
`

const Shop = ({ items, setItems, isLoading, setIsLoading }) => {
    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            setItems(items);
            setIsLoading(false);
        }
    }, [items]);

    const fetchItems = async () => {
        const data = await fetch(
            'https://fakestoreapi.com/products'
        );

        const items = await data.json();
        setItems(items);
    }



    return (
        <ShopWrapper>
            <ShopContainer>

                {isLoading ?
                    <h1 className="Loading">
                        Loading...
                    </h1>
                    : (items.map(item => (
                        <div key={item.id}>
                            <Link to={`/shop/${item.id}`}>
                                <div className="shopImgDiv">
                                    <div className="img">
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div className="titlePrice">
                                        <h3>{item.title}</h3>
                                        <p>${item.price}</p>
                                    </div>
                                    <button type="button" className="Btn">View Details</button>
                                </div>
                            </Link>
                        </div>
                    )))}

            </ShopContainer>
        </ShopWrapper>
    )
}

export default Shop;