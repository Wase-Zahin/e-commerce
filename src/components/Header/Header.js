import './Header.css';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LoginState from './LoginState/LoginState';

const HeaderWrapper = styled.div`
    background-color: black;
    box-shadow: 1px 1px 1px white;
`
const HeaderContainer = styled.div`
    height: auto;
    max-width: 1200px;
    margin: auto;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const Header = ({ Authenticated, setAuthenticated, items, isLoading }) => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <h1 className="logo">Logo</h1>
                <SearchBar items={items} isLoading={isLoading}></SearchBar>

                <div className="nav-links">
                    <Link style={{ color: "white" }} to="/shop">Shop</Link>
                    <Link style={{ color: "white" }} to="/">Home</Link>
                    <Link style={{ color: "white" }} to="/cart">Cart</Link>

                    {/* conditional rendering based on if the user is logged in or not */}
                    <LoginState 
                        Authenticated={Authenticated} 
                        setAuthenticated={setAuthenticated}></LoginState>
                </div>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;