import './Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LoginState from './LoginState/LoginState';
import { TbAlignRight } from 'react-icons/tb';
import { BsCart } from "react-icons/bs";
import Logo from "../../images/logo.png";
import { MyContextProvider } from '../../Context';

const Header = ({ Authenticated, setAuthenticated, items, isLoading }) => {
    const { } = MyContextProvider();
    return (
        <div className='headerWrapper'>
            <div className='headerContainer'>


                {/* left side of navbar (logo and search bar in big screen) */}
                <div className='navLeftSide'>
                    <Link to="/">
                        <img className='logo' src={Logo} />
                    </Link>
                    <SearchBar items={items} isLoading={isLoading}></SearchBar>
                </div>

                <div className='nav-links-wrapper'>
                    <Link style={{ color: "white" }} to="/cart">
                        <BsCart className='cartIcon' />
                    </Link>
                    <TbAlignRight className='menuIcon' /> {/* menuIcon in small screen */}

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
    )
}

export default Header;