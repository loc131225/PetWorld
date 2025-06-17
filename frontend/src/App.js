import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ThanhToan from './pages/Thanhtoan';
import LoginRegister from './pages/Loginregister';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return <>
  <Routes>
    <Route path=''>
      <Route path='thanhtoan' element={<ThanhToan/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='cart' element={<Cart/>}/>
    </Route>
    <Route path='login' element={<LoginRegister/>}/>
  </Routes>
  </>;
}

export default App;
