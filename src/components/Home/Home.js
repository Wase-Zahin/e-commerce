import { Link } from 'react-router-dom';
import "./Home.css";
import wave from "../../images/wave.svg";
import vector from "../../images/vector.jpg";

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
                    <img src={vector} className='bg-img' alt='vector background'></img>
                </div>
            </div>
            <img src={wave} alt="wave background"></img>
        </div>
    )
}

export default Home;