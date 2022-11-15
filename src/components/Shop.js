import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

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

const Shop = () => {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(
            'https://fakestoreapi.com/products'
        );

        const items = await data.json();
        setItems(items);

    }

    return (
        <ShopWrapper>
            <h1 className="shopHeader">Welcome to Shop Page!</h1>
            <ShopContainer>
                {items.map(item => (
                    <div key={item.id}>
                        <Link to={`/shop/${item.id}`}>
                            <div className="shopImgDiv">
                                <img src={item.image} alt={item.title}></img>
                                {item.title}
                            </div>
                        </Link>
                    </div>
                ))}
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Shop;