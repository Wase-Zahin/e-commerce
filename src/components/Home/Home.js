import { Link } from 'react-router-dom';
import "./Home.css";
import wave from "../../images/wave.svg";
import vector from "../../images/vector.jpg";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState('');
    const [Authenticated, setAuthenticated] = useState();
    useEffect(() => {
        checkLoggedIn();
    });

    const checkLoggedIn = async () => {
        axios.get("https://zahin0100.pythonanywhere.com/api/users/check_logged_in/", {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data)
                setLoggedIn(res.data.loggedIn);
                if (res.data.logged_in === true)
                    setAuthenticated(true);
                else setAuthenticated(false);
            })
            .catch((err) => { console.log(err) });
    };

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