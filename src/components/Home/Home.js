import { Link } from 'react-router-dom';
import "./Home.css";
import wave from "../../images/wave.svg";

const Home = () => {
    return (
        <div className='full-bg'>
            <div className='background'>
                <div className='mid'>
                    <div className='shopInvitation'>
                        <h2>We're here for all <br></br>of your shopping needs!</h2>
                        <Link style={{ color: "white" }} to="/shop">
                            <div className='shopBtn'>
                                <h3>Shop Now</h3>
                            </div>
                        </Link>
                    </div>
                    <div className='bg-img'>
                    </div>
                </div>
            </div>
            <img src={wave} alt="wave background image"></img>
        </div>
    )
}

export default Home;