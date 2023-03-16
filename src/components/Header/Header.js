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

                <TbAlignRight className='menuIcon' />
                <Link to="/"><img className='logo' src={Logo}></img></Link>
                <SearchBar items={items} isLoading={isLoading}></SearchBar>
                <BsCart className='cartIcon' />
                
                <div className="nav-links">
                    <Link style={{ color: "white" }} to="/shop">Shop</Link>
                    <Link style={{ color: "white" }} to="/cart">
                        <BsCart className='cartIcon' />
                    </Link>
                    {/* conditional rendering based on if the user is logged in or not */}
                    <LoginState
                        Authenticated={Authenticated}
                        setAuthenticated={setAuthenticated}>
                    </LoginState>
                </div>
            </div>
        </div>
    )
}

export default Header;