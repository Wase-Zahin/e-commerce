import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    return (
        <div className='background'>
            <div className='mid'>
                <h2>We're here for all <br></br>of your shopping needs!</h2>
                <Link style={{ color: "white" }} to="/shop">
                    <div className='box'>
                        <h3>Shop Now</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;