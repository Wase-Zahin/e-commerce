import styled from "styled-components"
import gitIcon from "../../images/github-icon.png"
import "./Footer.css";

const FooterContainer = styled.footer`
    display: grid;
    background-color: #181818;
    color: white;
    padding: 2.5rem;
    gap: 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
`
const Footer = () => {
    return (
        <div>
            <FooterContainer>
                <div className="company">
                    <h1>Company</h1>
                    <div>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Ut elit tellus, luctus nec
                            ullamcorper mattis,
                            pulvinar dapibus leo.</p>
                    </div>
                    <div>
                        <li>Address: 4710-4890 Breckinridge St, Fayettevill</li>
                        <li>Call Us: (+800) 345 678, (+800) 123 456</li>
                        <li>Email: support@domain.com</li>
                    </div>
                </div>
                <div className="contact">
                    <h2>Contact</h2>
                    <ul>
                        <p>My account</p>
                        <p>Order History</p>
                        <p>Wishlist</p>
                        <p>Privacy Policy</p>
                        <p>Frequently Asked</p>
                    </ul>
                </div>
                <div className="info">
                    <h2>Information</h2>
                    <ul>
                        <p>Delivery Information</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>Contact us</p>
                        <p>Contact</p>
                    </ul>
                </div>
                <div className="mail">
                    <h3>Sign Up For Newsletters</h3>
                    <p>Be the First to Know. Sign up for newsletter today !</p>
                    <input className="newsletter" placeholder="Enter your email address"></input>
                </div>
            </FooterContainer>
            <div className="footerLine"></div>
            <div className="copyright">
                Copyright © 2022 Zahin
                <a href='https://github.com/Wase-Zahin'>
                    <img
                        className='icon'
                        src={gitIcon}
                        alt='github'>
                    </img>
                </a>
            </div>
        </div>
    )
}

export default Footer;