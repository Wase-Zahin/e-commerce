import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        axios.get("http://localhost:8000/api/users/check_logged_in/", {
            withCredentials: true,
        }).then((res) => {console.log(res.data)})
        .catch((err) => {console.log(err)});
    };

    return (
        <div className='background'>
            <div className='mid'>
                <h2>We're here for all <br></br>of your shopping needs!</h2>
                <Link style={{ color: "white" }} to="/shop">
                    <div className='box'>
                        <h3>Shop Now</h3>
                    </div>
                </Link>
                <button onClick={checkLoggedIn}>check</button>
            </div>
        </div>
    )
}

export default Home;