import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import "./Shop.css";

const Shop = ({ items, setItems, isLoading, setIsLoading }) => {
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch(
            'https://fakestoreapi.com/products'
        );
        
        const items = await data.json();
        if (items) {
            setIsLoading(false);
            setItems(items);
        }
        else setIsLoading(true);
    }

    return (
        <div className="shopWrapper">
            <div className='shopContainer'>

                {isLoading ?
                    <h1 style={{ fontSize: '50px' }} className="Loading">
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

            </div>
        </div>
    )
}

export default Shop;