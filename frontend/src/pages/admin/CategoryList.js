import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrashAlt, FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import '../../css/CategoryList.css';
import Sidebar from '../admin/Sidebar';

const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryType, setCategoryType] = useState('all');
  const [sortDate, setSortDate] = useState('newest');

  const categories = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50/FF5733/FFFFFF?text=SP1',
      name: 'Sản Phẩm Cho Chó',
      createdAt: '31/05/2005',
      quantity: 20,
      status: 'active',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50/33FF57/FFFFFF?text=SP2',
      name: 'Sản Phẩm Cho Mèo',
      createdAt: '31/05/2005',
      quantity: 10,
      status: 'inactive',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50/3357FF/FFFFFF?text=SP3',
      name: 'Sản Phẩm Mới',
      createdAt: '31/05/2005',
      quantity: 5,
      status: 'active',
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avatarImg = 'https://i.pravatar.cc/30';

  return (
    <div className="layout">
      <Sidebar />

      <div className="category-management">

        {/* --- HEADER MỚI (from image) --- */}
        <div className="voucher-header">
          <FaBars className="icon" />
          <FaSearch className="icon" />
          <div className="spacer" />
          <FaBell className="icon red" />
          <FaEnvelope className="icon red" />
          <div className="user">Nguyễn Trung Kiên</div>
          <img src={avatarImg} alt="avatar" className="global-avatar" />
        </div>

        {/* --- NỘI DUNG TRANG --- */}
        <div className="page-header">
          <h2>Quản lý danh mục: Danh sách danh mục</h2>
          <button className="add-button">Thêm danh mục</button>
        </div>

        <div className="filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã danh mục, tên danh mục"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)}>
              <option value="all">Loại danh mục</option>
              <option value="dog">Chó</option>
              <option value="cat">Mèo</option>
            </select>
            <select value={sortDate} onChange={(e) => setSortDate(e.target.value)}>
              <option value="newest">Ngày tạo</option>
              <option value="oldest">Cũ nhất</option>
            </select>
            <button className="apply-filter-button">Lưu bộ lọc</button>
          </div>
        </div>

        <div className="table-container">
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
              {filteredCategories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={category.image} alt={category.name} className="category-image" />
                  </td>
                  <td>{category.name}</td>
                  <td>{category.createdAt}</td>
                  <td>{category.quantity}</td>
                  <td>
                    {category.status === 'active' ? (
                      <FaEye title="Đang hiển thị" className="action-icon" />
                    ) : (
                      <FaEyeSlash title="Đã ẩn" className="action-icon" />
                    )}
                  </td>
                  <td className="actions">
                    <FaEdit className="action-icon" title="Chỉnh sửa" />
                    <FaTrashAlt className="action-icon" title="Xoá" style={{ marginLeft: '10px' }} />
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

export default CategoryList;
