import './App.css';
import Home from './components/Home';
import Shop from './components/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import Item from './components/ItemDetails';
import Cart from './components/Cart';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart setCart={setCart} cart={cart} />} />
        <Route path='/shop/:id' element={<Item setCart={setCart} cart={cart} />} />
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;
