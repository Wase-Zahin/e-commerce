import './App.css';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Item from './components/ItemDetails/ItemDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/Signup/Signup';

const App = () => {
  const [cart, setCart] = useState([]);
  const [Authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <Router>
      <Header
        Authenticated={Authenticated}
        setAuthenticated={setAuthenticated}
        username={username}
        setUsername={setUsername}>
      </Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart setCart={setCart} cart={cart} />} />
        <Route
          path='/login'
          element={
            <Login
              Authenticated={Authenticated}
              setAuthenticated={setAuthenticated}
              username={username}
              setUsername={setUsername}
            />}
        />
        <Route
          path='/shop/:id'
          element={
            <Item
              Authenticated={Authenticated}
              setAuthenticated={setAuthenticated}
              setCart={setCart}
              cart={cart}
            />} />
      </Routes>
      <Footer></Footer>
      <div className='overlay'></div>
    </Router>
  )
}

export default App;
