import React from "react";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./../../css/CategoryList.css";
import Sidebar from '../admin/Sidebar';

import avatarImg from '../../assets/myden.jpg';

const data = [
  {
    id: 1,
    name: "Sản Phẩm Cho Chó",
    img: "/images/dog1.png",
    date: "31/05/2005",
    quantity: 20,
  },
  {
    id: 2,
    name: "Sản Phẩm Cho Mèo",
    img: "/images/cat1.png",
    date: "31/05/2005",
    quantity: 10,
  },
  {
    id: 3,
    name: "Sản Phẩm Mới",
    img: "/images/new1.png",
    date: "31/05/2005",
    quantity: 5,
  },
  {
    id: 4,
    name: "Sản Phẩm Bán Chạy",
    img: "/images/hot1.png",
    date: "31/05/2005",
    quantity: 10,
  },
  {
    id: 5,
    name: "Deal Giá Sốc",
    img: "/images/sale1.png",
    date: "31/05/2005",
    quantity: 1,
  },
];

function CategoryList() {
  return (
    <div className="layout">
      <Sidebar /> 

      <div className="category-container">
        {/* Header thêm vào */}
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

        <h2>Quản lý danh mục: Danh sách danh mục</h2>
        <div className="category-toolbar">
          <input type="text" placeholder="Tìm kiếm theo mã danh mục, tên danh mục" />
          <button className="add-btn">+ Thêm danh mục</button>
        </div>

        <table className="category-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Ngày khởi tạo</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td><img src={item.img} alt={item.name} className="category-img" /></td>
                <td><a href="#">{item.name}</a></td>
                <td>{item.date}</td>
                <td>{item.quantity}</td>
                <td><FaEye className="icon" /></td>
                <td className="actions">
                  <FaEdit className="icon" title="Sửa" />
                  <FaTrash className="icon" title="Xoá" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
}

export default CategoryList;
