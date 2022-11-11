import styled from "styled-components"

const FooterContainer = styled.footer`
    display: grid;
    background-color: #393E46;
    color: white;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
`
const Footer = () => {
    return (
        <FooterContainer>
            <div>
                <h2>Company</h2>
                <p>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. 
                    Ut elit tellus, luctus nec 
                    ullamcorper mattis, 
                    pulvinar dapibus leo.</p>
            </div>
            <div>
                <h3>Contact</h3>
                <ul>
                    <li>My account</li>
                    <li>Order History</li>
                    <li>Wishlist</li>
                    <li>Privacy Policy</li>
                    <li>Frequently Asked</li>
                </ul>
            </div>
            <div>
                <h3>Information</h3>
                <ul>
                    <li>Delivery Information</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Contact us</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <h3>Sign Up For Newsletters</h3>
                <p>Be the First to Know. Sign up for newsletter today !</p>
                <input placeholder="Enter your email address"></input>
            </div>
        </FooterContainer>
    )
}

export default Footer;