import styled from "styled-components";
import { Link } from 'react-router-dom';
import cartIcon from '../images/cart.png';
import homeIcon from '../images/home.png';

const HeaderWrapper = styled.div`
    background-color: black;
    box-shadow: 1px 1px 1px white;
    position: relative;
    z-index: 100;
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

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <h1 className="logo">Logo</h1>
                <div className="nav-links">
                    <Link style={{ color: "white" }} to="/shop">
                        <div>Shop</div>
                    </Link>
                    <Link style={{ color: "white" }} to="/">
                        <img src={homeIcon} alt='home'></img>
                    </Link>
                    <Link style={{ color: "white" }} to="/cart">
                        <img src={cartIcon} alt='cart'></img>
                    </Link>
                </div>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;