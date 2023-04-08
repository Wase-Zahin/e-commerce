import './Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LoginState from './LoginState/LoginState';
import { TbAlignRight } from 'react-icons/tb';
import { BsCart } from "react-icons/bs";
import Logo from "../../images/logo.png";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = ({ Authenticated, setAuthenticated, items, isLoading }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const cart = JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        const totalItems = cart.reduce((total, item) => total + item.counter, 0);
        setTotalCartItems(totalItems);
    }, [cart]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleLogout = () => {
        axios.post("https://zahin0100.pythonanywhere.com/api/users/logout/", {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setAuthenticated(false);
        localStorage.setItem('username', '');
        localStorage.setItem('cart', JSON.stringify([]));
    }

    return (
        <>
            <div className='headerWrapper'>
                <div className='headerContainer'>
                    {/* left side of navbar (logo and search bar in big screen) */}
                    <div className='navLeftSide'>
                        <Link to="/">
                            <img className='logo' src={Logo} alt='logo' />
                        </Link>
                        <SearchBar items={items} isLoading={isLoading}></SearchBar>
                    </div>

                    <div className='nav-links-wrapper'>
                        <div className='cartIconWrapper'>
                            <Link style={{ color: "white" }} to="/cart">
                                <BsCart className='cartIcon' />
                            </Link>
                            {totalCartItems > 0 && (
                                <div className='cartCount'>{totalCartItems}</div>
                            )}
                        </div>

                        <TbAlignRight className='menuIcon' onClick={toggleDropdown} /> {/* menuIcon in small screen */}

                        {/* display non in small screen (nav-links) */}
                        <div className='nav-links'>
                            <Link style={{ color: "white" }} to="/shop">Shop</Link>

                            {/* conditional rendering based on if the user is logged in or not */}
                            <LoginState
                                Authenticated={Authenticated}
                                setAuthenticated={setAuthenticated}>
                            </LoginState>
                        </div>
                    </div>
                </div>
            </div>
            {showDropdown &&
                <div className='dropdownMenu' style={{ width: '100%' }}>
                    <Link style={{ color: "white" }} to="/shop">Shop</Link>
                    {Authenticated ? (
                        <Link style={{ color: "white" }} to="/login" onClick={handleLogout}>Logout</Link>
                    ) : (
                        <>
                            <Link style={{ color: "white" }} to="/signup">Signup</Link>
                            <Link style={{ color: "white" }} to="/login">Login</Link>
                        </>
                    )}
                </div>
            }

        </>
    )
}

export default Header;
