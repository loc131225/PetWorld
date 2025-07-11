import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaGift,
  FaComments,
  FaList,
  FaPen,
  FaDog,
  FaShoppingCart,
  FaEnvelope,
  FaChartBar,
  FaBox
} from 'react-icons/fa';
import logo from '../../assets/logoPetWord.png';
import '../../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Adminator</h1>
      </div>
      <ul className="sidebar-menu">
  <li>
    <NavLink to="/admin/Dashboard" className="menu-link">
      <FaChartBar className="icon" />
      <span className="text">Thống kê</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/UserList" className="menu-link">
      <FaUser className="icon" />
      <span className="text">Quản lý tài khoản</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/CategoryList" className="menu-link">
      <FaList className="icon" />
      <span className="text">Quản lý danh mục</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/ProductTable" className="menu-link">
      <FaShoppingCart className="icon" />
      <span className="text">Quản lý sản phẩm</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/OrderList" className="menu-link">
      <FaBox className="icon" />
      <span className="text">Quản lý đơn hàng</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/VoucherTable" className="menu-link">
      <FaGift className="icon" />
      <span className="text">Quản lý voucher</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/CommentList" className="menu-link">
      <FaComments className="icon" />
      <span className="text">Quản lý bình luận</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/PostCategoryList" className="menu-link">
      <FaPen className="icon" />
      <span className="text">Quản lý danh mục bv</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/pets" className="menu-link">
      <FaPen className="icon" />
      <span className="text">Quản lý bài viết</span>
    </NavLink>
  </li>
</ul>

    </div>
  );
};

export default Sidebar;
