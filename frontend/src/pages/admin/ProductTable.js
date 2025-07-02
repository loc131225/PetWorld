import React, { useEffect, useState } from 'react';
import Sidebar from '../admin/Sidebar';
import avatarImg from '../../assets/myden.jpg';
import { FaEye, FaEyeSlash, FaEdit, FaTrashAlt, FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import '../../css/ProductTable.css';
import { getAllProducts } from '../../api/productApi'; 
import { formatVND } from '../../utils/formatPrice'; // Assuming you have a utility function to format prices
import { format } from "date-fns";

const ProductTable = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
        getAllProducts()
          .then(data => {
            setProducts(data.data)
            setLoading(false);
          })
          .catch(err => console.error(err));
      }, []);

      console.log(products)
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
              {loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td><img src={product.image} alt={product.name} className="product-image" /></td>
                  <td className="product-name">{product.name}</td>
                  <td>{formatVND(Number(product.price))}</td>
                  <td>{formatVND(Number(product.sale_price))}</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                                    {product.created_at
                                      ? format(new Date(product.created_at), "dd/MM/yyyy") // Format ngày
                                      : ""}
                                  </td>
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
