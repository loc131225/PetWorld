import { useLocation } from "react-router-dom";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ThanhToan from "./pages/users/Thanhtoan";
import LoginRegister from "./pages/users/Loginregister";
import Home from "./pages/users/Home";
import Cart from "./pages/users/Cart";
import CategoryList from "./pages/admin/CategoryList";
import ProductTable from "./pages/admin/ProductTable";
import UserList from "./pages/admin/UserList";
import ProductDetail from "./pages/users/ProductDetail";
import Timkiem from "./pages/users/Timkiem";
import VoucherTable from "./pages/admin/VoucherTable";
import Dashboard from "./pages/admin/Dashboard";
import CommentList from "./pages/admin/CommentList";
import OrderList from "./pages/admin/OrderList";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='login' element={<LoginRegister/>}/>
        <Route path="thanhtoan" element={<ThanhToan />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Timkiem" element={<Timkiem />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="admin/CategoryList" element={<CategoryList />} />
        <Route path="admin/ProductTable" element={<ProductTable />} />
        <Route path="admin/UserList" element={<UserList />} />
        <Route path="ProductDetail/:slug" element={<ProductDetail />} />
        <Route path="admin/VoucherTable" element={<VoucherTable />} />
        <Route path="admin/Dashboard" element={<Dashboard />} />
        <Route path="admin/CommentList" element={<CommentList />} />
        <Route path="admin/OrderList" element={<OrderList />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
