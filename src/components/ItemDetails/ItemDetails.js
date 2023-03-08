import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import "./ItemDetails.css";
import axios from "axios";

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

const Item = ({ cart, setCart, Authenticated, setAuthenticated }) => {
    const [loginprompt, setLoginprompt] = useState("");

    useEffect(() => {
        checkLoggedIn();
        fetchItem();
    }, [Authenticated]);

    const { id } = useParams();
    const [item, setItem] = useState([]);

    const checkLoggedIn = async () => {
        axios.get("http://localhost:8000/api/users/check_logged_in/", {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.logged_in === true)
                    setAuthenticated(true);
                else setAuthenticated(false);
            })
            .catch((err) => { console.log(err) });
    };

    const addToCart = () => {
        if (Authenticated) {
            const existingItem = cart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // If item exists, increment counter property of existing item
                const updatedCart = cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return { ...cartItem, counter: cartItem.counter + 1 };
                    }
                    return cartItem;
                });
                setCart(updatedCart, () => {
                    // Set cart to local storage with the updated state
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                });
            } else {
                // If item doesn't exist, add it to cart with counter property of 1
                setCart((cart) => {
                    const newCart = [...cart, { ...item, counter: 1 }];
                    // Set cart to local storage with the updated state
                    localStorage.setItem('cart', JSON.stringify(newCart));
                    return newCart;
                });
            }
        } else {
            setLoginprompt("Please login to add items to cart");
        }
    };



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
                    <p style={{ textAlign: "center", color: "red"}}>{loginprompt}</p>
                </div>
            </ShopContainer>
        </ShopWrapper>
    )
}

export default Item;