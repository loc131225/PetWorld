import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ThanhToan from './pages/users/Thanhtoan';
import LoginRegister from './pages/users/Loginregister';
import Home from './pages/users/Home';
import Cart from './pages/users/Cart';
import CategoryList from './pages/admin/CategoryList';
import ProductTable from './pages/admin/ProductTable';
import UserList from './pages/admin/UserList';
import ProductDetail from './pages/users/ProductDetail';
import Timkiem from './pages/users/Timkiem';
import Sidebar from './pages/admin/Sidebar';
import VoucherTable from './pages/admin/VoucherTable';
import Dashboard from './pages/admin/Dashboard';
import CommentList from './pages/admin/CommentList';
import OrderList from './pages/admin/OrderList';



function App() {
  return <>
  <Routes>
    <Route path=''>
      {/* <Route path='Header' element={<Header/>}/> */}
      <Route path='thanhtoan' element={<ThanhToan/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='CategoryList' element={<CategoryList/>}/>
      <Route path='ProductTable' element={<ProductTable/>}/>
      <Route path='UserList' element={<UserList/>}/>
      <Route path='ProductDetail' element={<ProductDetail/>}/>
      <Route path='Timkiem' element={<Timkiem/>}/>
      <Route path='Sidebar' element={<Sidebar/>}/>
      <Route path='VoucherTable' element={<VoucherTable/>}/>
      <Route path='Dashboard' element={<Dashboard/>}/>
      <Route path='CommentList' element={<CommentList/>}/>
      <Route path='OrderList' element={<OrderList/>}/>

      <Route path="/product/:id" element={<ProductDetail />} />

    </Route>
  </Routes>
  </>;
}

export default App;
