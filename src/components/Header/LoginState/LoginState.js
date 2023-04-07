import './LoginState.css';
import React from 'react'
import { FaRegUser } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LoginState({ Authenticated, setAuthenticated }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const storedUsername = localStorage.getItem('username');

    // to check if the user is logged in and render it in the header
    const checkLoggedIn = async () => {
        axios.get("http://localhost:8000/api/users/check_logged_in/", {
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.logged_in === true) {
                    setAuthenticated(true);
                }
                else {
                    setAuthenticated(false);
                }
            })
            .catch((err) => { console.log(err) });
    };

    useEffect(() => {
        const overlay = document.querySelector(".overlay");
        checkLoggedIn();

        // close the dropdown manu
        const closeMenu = () => {
            setIsOpen(false);
            overlay.style.display = "none";
        };

        if (isOpen) {
            overlay.style.display = "block";
            overlay.addEventListener("click", closeMenu);
        } else {
            overlay.style.display = "none";
            overlay.removeEventListener("click", closeMenu);
        }

    }, [isOpen, Authenticated, storedUsername]);

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/users/logout/", {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setAuthenticated(false);
        localStorage.setItem('username', '');
    }

    const handleDropdown = () => {
        const overlay = document.querySelector('.overlay');
        setIsOpen(!isOpen);
        overlay.style.display = "block"
    };

    // these 2 functions are used so that dropdown menu has the same width as the dropdown button
    const getButtonWidth = () => {
        return (
            buttonRef.current.getBoundingClientRect().width
        );
    };

    const getMenuStyles = () => {
        return isOpen ? { width: getButtonWidth() } : { display: 'none' };
    };

    return (
        <div className="login_state">
            <button onClick={handleDropdown} className="dropdown-button" ref={buttonRef} >
                <FaRegUser className='userIcon' />
                {Authenticated ? storedUsername : "Login"}
            </button>

            {Authenticated ? (
                isOpen && (
                    <div className="dropdown-menu" style={getMenuStyles()}>
                        <Link style={{ color: "white" }} to="/login">
                            <button className="link_item" onClick={() => { handleLogout(); handleDropdown() }}>Logout</button>
                        </Link>
                    </div>
                )
            ) : (
                <div className="dropdown-menu" style={getMenuStyles()}>
                    <Link style={{ color: "white" }} to="/login">
                        <button onClick={handleDropdown} className="link_item">Login</button>
                    </Link>
                    <Link style={{ color: "white" }} to="/signup">
                        <button onClick={handleDropdown} className="link_item">Signup</button>
                    </Link>
                    <Link style={{ color: "white" }} to="/login">
                        <button className="link_item" onClick={() => { handleLogout(); handleDropdown() }}>Logout</button>
                    </Link>
                </div>
            )}
        </div>
    )
}
