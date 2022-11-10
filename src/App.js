import './App.css';
import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;
