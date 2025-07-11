import React, { useState } from "react";
import "./../../css/PostCategoryList.css";
import Sidebar from '../admin/Sidebar';
import { FaEye, FaTrash, FaEdit, FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import avatarImg from '../../assets/myden.jpg';

const initialData = [
  {
    id: 1,
    title: "Tin tức",
    createdAt: "03/02/2005",
    updatedAt: "13/04/2005",
  },
  {
    id: 2,
    title: "Sự kiện",
    createdAt: "01/03/2005",
    updatedAt: "03/04/2005",
  },
  {
    id: 3,
    title: "Khuyến mãi",
    createdAt: "10/03/2005",
    updatedAt: "15/04/2005",
  },
];

const PostCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc dữ liệu theo tiêu đề
  const filteredData = initialData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {/* --- PHẦN HEADER --- */}
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

        <div className="post-category-container">
      <div className="top-bar">
        <h2>Quản lý bài viết: Danh sách danh mục bài viết</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã bài viết"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select><option>Trạng thái</option></select>
          <select><option>Tác giả</option></select>
          <select><option>Danh mục bài viết</option></select>
          <button>Lưu bộ lọc</button>
          <button className="add-btn">+ Thêm danh mục</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Ngày đăng</th>
            <th>Ngày cập nhật</th>
            <th>Trạng thái</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td><a href="#">{item.title}</a></td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td><FaEye /></td>
                <td>
                  <FaEdit style={{ marginRight: "10px", cursor: "pointer" }} />
                  <FaTrash style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không tìm thấy bài viết phù hợp.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>&gt;</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PostCategoryList;
