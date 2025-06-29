import React, { useState } from 'react';
import Sidebar from '../admin/Sidebar';
import avatarImg from '../../assets/myden.jpg';
import { FaEye, FaEyeSlash, FaEdit, FaTrashAlt, FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import '../../css/ProductTable.css';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      image: '/images/product1.jpg',
      name: 'Xịt vệ sinh Răng Miệng Chó Mèo',
      price: 289000,
      discountPrice: 289000,
      quantity: 30,
      date: '31/05/2005',
      status: true,
    },
    {
      id: 2,
      image: '/images/product2.jpg',
      name: 'Khăn ướt vệ sinh Đa Năng',
      price: 289000,
      discountPrice: 289000,
      quantity: 30,
      date: '31/05/2005',
      status: false,
    },
    {
      id: 3,
      image: '/images/product1.jpg',
      name: 'Xịt vệ sinh Răng Miệng Chó Mèo',
      price: 289000,
      discountPrice: 289000,
      quantity: 30,
      date: '31/05/2005',
      status: true,
    },
    {
      id: 4,
      image: '/images/product1.jpg',
      name: 'Xịt vệ sinh Răng Miệng Chó Mèo',
      price: 289000,
      discountPrice: 289000,
      quantity: 30,
      date: '31/05/2005',
      status: true,
    },
    {
      id: 5,
      image: '/images/product1.jpg',
      name: 'Xịt vệ sinh Răng Miệng Chó Mèo',
      price: 289000,
      discountPrice: 289000,
      quantity: 30,
      date: '31/05/2005',
      status: true,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <Sidebar />
      <div style={{ flex: 1 }}>
        {/* --- GLOBAL HEADER --- */}
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

        {/* --- CONTENT: PRODUCT TABLE --- */}
        <div className="product-table-container">
          <h2>Quản lý sản phẩm: Danh sách sản phẩm</h2>

          <div className="product-controls">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm theo mã sản phẩm, tên sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select><option>Loại sản phẩm</option></select>
            <select><option>Ngày tạo</option></select>
            <select><option>Bộ lọc khác</option></select>
            <button className="btn-save">Lưu bộ lọc</button>
            <button className="btn-add">+ Thêm sản phẩm</button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Giá giảm</th>
                <th>Số lượng</th>
                <th>Ngày khởi tạo</th>
                <th>Trạng thái</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td><img src={product.image} alt={product.name} className="product-image" /></td>
                  <td className="product-name">{product.name}</td>
                  <td>{product.price.toLocaleString()} đ</td>
                  <td>{product.discountPrice.toLocaleString()} đ</td>
                  <td>{product.quantity}</td>
                  <td>{product.date}</td>
                  <td>
                    {product.status ? (
                      <FaEye title="Đang hiển thị" className="action-icon" />
                    ) : (
                      <FaEyeSlash title="Đã ẩn" className="action-icon" />
                    )}
                  </td>
                  <td>
                    <FaEdit title="Chỉnh sửa" className="action-icon" />
                    <FaTrashAlt title="Xoá" className="action-icon" style={{ marginLeft: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button>&lt;</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
