import './Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LoginState from './LoginState/LoginState';
import { TbAlignRight } from 'react-icons/tb';
import { BsCart } from "react-icons/bs";
import Logo from "../../images/logo.png";
import { useState } from 'react';

const Header = ({ Authenticated, setAuthenticated, items, isLoading }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
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
                        <Link style={{ color: "white" }} to="/cart">
                            <BsCart className='cartIcon' />
                        </Link>
                        <TbAlignRight className='menuIcon' onClick={toggleDropdown} /> {/* menuIcon in small screen */}

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
                    <LoginState
                        Authenticated={Authenticated}
                        setAuthenticated={setAuthenticated}>
                    </LoginState>
                </div>
            }
        </>
    )
}

export default Header;
