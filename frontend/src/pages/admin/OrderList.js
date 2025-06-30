import React, { useState } from "react";
import Sidebar from '../admin/Sidebar';
import "../../css/OrderList.css";
import { FaBars, FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import avatarImg from "../../assets/myden.jpg";

const orders = [
  { id: "#0010", date: "16/08/2025 11:18", customer: "Nguyễn Thanh Minh Lộc", paid: false, status: "Đang xử lý", amount: "600.000Đ" },
  { id: "#0009", date: "15/08/2025 10:18", customer: "Nguyễn Thanh Minh Lộc", paid: false, status: "Đã huỷ", amount: "600.000Đ" },
  { id: "#0008", date: "15/08/2025 09:18", customer: "Võ Trung Hậu", paid: true, status: "Đang xử lý", amount: "600.000Đ" },
  { id: "#0007", date: "14/08/2025 19:18", customer: "Lý Mạc Sầu", paid: true, status: "Chờ xử lý", amount: "600.000Đ" },
  { id: "#0006", date: "13/08/2025 20:11", customer: "Luôn Vui Tươi", paid: false, status: "Đang xử lý", amount: "600.000Đ" },
  { id: "#0005", date: "12/08/2025 14:10", customer: "Nguyễn Hưng", paid: true, status: "Chờ xử lý", amount: "600.000Đ" },
  { id: "#0004", date: "12/08/2025 10:09", customer: "Đặng Trần Khánh Đăng", paid: true, status: "Giao thành công", amount: "600.000Đ" },
  { id: "#0003", date: "10/08/2025 21:06", customer: "Nguyễn Trung Kiên", paid: true, status: "Giao thành công", amount: "600.000Đ" },
  { id: "#0002", date: "06/08/2025 08:35", customer: "Đàm Vĩnh Hưng", paid: false, status: "Đã huỷ", amount: "600.000Đ" },
];

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="order-container">
        {/* HEADER */}
        <div className="global-header">
          <FaBars className="global-icon" />
          <FaSearch className="global-icon" />
          <div className="global-spacer" />
          <FaBell className="global-icon red" />
          <FaEnvelope className="global-icon red" />
          <div className="global-user-group">
            <span className="global-user">Nguyễn Trung Kiên</span>
            <img src={avatarImg} alt="avatar" className="global-avatar" />
          </div>
        </div>

        {/* FILTER & SEARCH */}
        <h2 className="order-title">Quản lý đơn hàng</h2>
        <div className="filter-row">
          <select className="filter-select">
            <option>Lọc đơn hàng</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ORDER TABLE */}
        <table className="order-table">
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o, idx) => (
              <tr key={idx}>
                <td>{o.id}</td>
                <td>{o.date}</td>
                <td>{o.customer}</td>
                <td>
                  <span className={`badge ${o.paid ? "paid" : "unpaid"}`}>
                    {o.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </td>
                <td>
                  <span className={`badge status ${o.status.replaceAll(" ", "-").toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
                <td>{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button>{'<'}</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
