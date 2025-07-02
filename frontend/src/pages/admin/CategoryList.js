import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./../../css/CategoryList.css";
import Sidebar from '../admin/Sidebar';
import avatarImg from '../../assets/myden.jpg';
import { getAllCategories } from '../../api/categoriesApi'; 
import { format } from "date-fns";

function CategoryList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      getAllCategories()
        .then(data => {
          setCategories(data.data)
          setLoading(false);
        })
        .catch(err => console.error(err));
    }, []);

  const handleAddCategory = () => {
    alert("Bạn muốn thêm danh mục mới? (chưa xử lý chức năng)");
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="category-container">
        {/* Header */}
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
          <input
            type="text"
            placeholder="Tìm kiếm theo mã danh mục, tên danh mục"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={handleAddCategory}>+ Thêm danh mục</button>
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
            {loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}
            {categories.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td><img src={item.image} alt={item.name} className="category-img" /></td>
                <td><a href="#">{item.name}</a></td>
                <td>
                  {item.created_at
                    ? format(new Date(item.created_at), "dd/MM/yyyy") // Format ngày
                    : ""}
                </td>
                <td>{item.products_count}</td>
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
