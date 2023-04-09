import './App.css';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Item from './components/ItemDetails/ItemDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import CheckoutStatus from './components/CheckoutStatus/CheckoutStatus';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/Signup/Signup';

const App = () => {
  const [total, setTotal] = useState(0); // cart total for checkout
  const [isLoading, setIsLoading] = useState(true); // check if the fetching products is completed
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]); // the cart items was sent to ItemDetails component from where the items were added to the cart
  const [Authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [totalCartItems, setTotalCartItems] = useState(0);

  const storedCart = localStorage.getItem('cart') || '[]';

  useEffect(() => {
    setCart(JSON.parse(storedCart));
    const totalItems = JSON.parse(storedCart)?.reduce((total, item) => total + item.counter, 0);
    setTotalCartItems(totalItems);
  }, []);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(
      'https://fakestoreapi.com/products'
    );

    const items = await data.json();
    if (items) {
      setIsLoading(false);
      setItems(items);
    }
    else setIsLoading(true);
  }

  return (
    <Router>
      <Header
        Authenticated={Authenticated}
        setAuthenticated={setAuthenticated}
        username={username}
        setUsername={setUsername}
        items={items}
        isLoading={isLoading}
        cart={cart}
        totalCartItems={totalCartItems}>
      </Header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/shop'
          element={
            <Shop
              cart={cart}
              items={items}
              setItems={setItems}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route path='/signup' element={<SignUp />} />

        <Route
          path='/cart'
          element={
            <Cart
              setCart={setCart}
              cart={cart}
              total={total}
              setTotal={setTotal}
            />
          }
        />

        <Route
          path='/login'
          element={
            <Login
              Authenticated={Authenticated}
              setAuthenticated={setAuthenticated}
              username={username}
              setUsername={setUsername} />
          }
        />

        <Route
          path='/shop/:id'
          element={
            <Item
              Authenticated={Authenticated}
              setAuthenticated={setAuthenticated}
              cart={cart}
              setCart={setCart} />
          }
        />

        <Route
          path='/cart/checkout'
          element={
            <Checkout
              total={total}
            />
          }
        />
        <Route
          path='/cart/checkout/status'
          element={<CheckoutStatus />} />
      </Routes>
      <Footer></Footer>
      <div className='overlay'></div>
    </Router>
  )
}

export default App;
