import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            const response = await fetch("http://localhost:8000/api/users/check_logged_in/");
            const data = await response.json();
            setLoggedIn(data.logged_in);
        };
        setTimeout(() => {
            console.log(loggedIn);
        }, 3000);
        checkLoggedIn();
    }, [loggedIn]);

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