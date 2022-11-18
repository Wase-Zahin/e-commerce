import styled from "styled-components";
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
    background-color: #393E46;
`
const HeaderContainer = styled.div`
    height: auto;
    max-width: 1200px;
    margin: auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <h3>Logo</h3>
                <div className="nav-links">
                    <Link style={{ color: "white" }} to="/">
                        <div>Home</div>
                    </Link>
                    <Link style={{ color: "white" }} to="/about">
                        <div>About</div>
                    </Link>
                    <Link style={{ color: "white" }} to="/shop">
                        <div>Shop</div>
                    </Link>
                    <Link style={{ color: "white" }} to="/cart">
                        <div>Cart</div>
                    </Link>
                </div>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

export default Header;