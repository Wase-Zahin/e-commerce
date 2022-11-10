import styled from "styled-components"

const FooterContainer = styled.div`
    display: grid;
    background-color: #393E46;
    grid-template-columns: repeat(auto, minmax(300px, 1fr)); 
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
        </FooterContainer>
    )
}

export default Footer;