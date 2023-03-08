import './Header.css';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import user_icon from '../../images/user-icon.svg';
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const HeaderWrapper = styled.div`
    background-color: black;
    box-shadow: 1px 1px 1px white;
`
const HeaderContainer = styled.div`
    height: auto;
    max-width: 1200px;
    margin: auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const Header = ({ Authenticated, setAuthenticated }) => {
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

    // close the dropdown many and call the check function
    useEffect(() => {
        const overlay = document.querySelector(".overlay");
        checkLoggedIn();

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

    const getButtonWidth = () => {
        return buttonRef.current.getBoundingClientRect().width;
    };
    const getMenuStyles = () => {
        return isOpen ? { width: getButtonWidth() } : { display: 'none' };
    };

    return (
        <HeaderWrapper>
            <HeaderContainer>
                <h1 className="logo">Logo</h1>
                <div className="nav-links">
                    <Link style={{ color: "white" }} to="/shop">Shop</Link>
                    <Link style={{ color: "white" }} to="/">Home</Link>
                    <Link style={{ color: "white" }} to="/cart">Cart</Link>

                    {/* conditional rendering based on if the user is logged in or not */}
                    <div className="login_state">
                        <button onClick={handleDropdown} className="dropdown-button" ref={buttonRef} >
                            <img className="user-icon" src={user_icon} alt="User Icon"></img>
                            {Authenticated ? storedUsername : "Login"}
                        </button>

                        {Authenticated ? (
                            isOpen && (
                                <div className="dropdown-menu" style={getMenuStyles()}>
                                    <Link style={{ color: "white" }} to="/login">
                                        <button className="link_item" onClick={() => {handleLogout(); handleDropdown()}}>Logout</button>
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
                                    <button className="link_item" onClick={() => {handleLogout(); handleDropdown()}}>Logout</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;