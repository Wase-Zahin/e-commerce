import './App.css';
import Home from './components/Home';
import Shop from './components/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import Item from './components/ItemDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/Signup';

const App = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart setCart={setCart} cart={cart} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shop/:id' element={<Item setCart={setCart} cart={cart} />} />
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;
