import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./ItemDetails.css";
import axios from "axios";

const Item = ({ cart, setCart, Authenticated, setAuthenticated }) => {
    const [loginprompt, setLoginprompt] = useState("");
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [item, setItem] = useState([]);

    useEffect(() => {
        checkLoggedIn();
        fetchItem();
        setCart(loadCartFromLocalStorage());
    }, [Authenticated, id]);

    const loadCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                return Array.isArray(parsedCart) ? parsedCart : [];
            } catch (error) {
                console.error("Failed to parse stored cart:", error);
            }
        }
        return [];
    };

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
            const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
            if (existingItemIndex >= 0) {
                // If item exists, increment counter property of existing item
                const updatedCart = cart.map((cartItem, index) => {
                    if (index === existingItemIndex) {
                        return { ...cartItem, counter: cartItem.counter + 1 };
                    }
                    return cartItem;
                });
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            } else {
                // If item doesn't exist, add it to cart with counter property of 1
                const newCartItem = { ...item, counter: 1 };
                const newCart = [...cart, newCartItem];
                setCart(newCart);
                // Set cart to local storage with the updated state
                localStorage.setItem("cart", JSON.stringify(newCart));
            }
            setMessage("Your Item has been added to cart!");
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
        <div className="ShopWrapper">
            <div className="ShopContainer">
                <div className="imgDiv">
                    <img src={item.image} alt={item.title}></img>
                </div>
                <div className="item">
                    <h1>{item.title}</h1>
                    <h2>${item.price}</h2>
                    <p>{item.description}</p>
                    <button onClick={addToCart} className="Btn">Add To Cart</button>
                    <p style={{ textAlign: "center", color: "red" }}>{loginprompt}</p>
                    <p style={{ textAlign: "center", color: "#03C988" }}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Item;