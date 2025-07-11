import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import "../../css/PostList.css";
import Sidebar from './Sidebar';
import avatarImg from '../../assets/myden.jpg';
import img1 from "../../assets/myden.jpg";
import img2 from "../../assets/myden.jpg";
import img3 from "../../assets/myden.jpg";
import img4 from "../../assets/myden.jpg";
import img5 from "../../assets/myden.jpg";

const initialData = [
  {
    id: 1,
    title: "Tại sao chó bị bỏ chết?",
    image: img1,
    category: "Tin tức",
    author: "Hữu",
    createdAt: "03/02/2005",
    updatedAt: "13/04/2005",
  },
  {
    id: 2,
    title: "Cách Chọn Thức Ăn Cho Mèo Phù Hợp Với Từng Giai Đoạn",
    image: img2,
    category: "Tin tức",
    author: "Đen",
    createdAt: "01/03/2005",
    updatedAt: "03/04/2005",
  },
  {
    id: 3,
    title: "10 Món Ăn Tốt Nhất Cho Chó Của Bạn Mỗi Ngày",
    image: img3,
    category: "Tin tức",
    author: "He",
    createdAt: "01/03/2005",
    updatedAt: "03/04/2005",
  },
  {
    id: 4,
    title: "Vì Sao Mèo Hay Cào Ghế? Cách Khắc Phục Hiệu Quả",
    image: img4,
    category: "Tin tức",
    author: "Hói",
    createdAt: "01/03/2005",
    updatedAt: "03/04/2005",
  },
  {
    id: 5,
    title: "Dấu Hiệu Nhận Biết Chó Mèo Bị Sốt Và Cách Xử Lý",
    image: img5,
    category: "Tin tức",
    author: "Black",
    createdAt: "01/03/2005",
    updatedAt: "03/04/2005",
  },
];

const PostList = () => {
  const [search, setSearch] = useState("");

  const filteredPosts = initialData.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
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

        <div className="post-list-container">
      <h2>Quản lý bài viết: Danh sách bài viết</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã bài viết"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select><option>Trạng thái</option></select>
        <select><option>Tác giả</option></select>
        <select><option>Danh mục bài viết</option></select>
        <button>Lưu bộ lọc</button>
        <button className="add-btn">+ Thêm bài viết</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Danh mục bài viết</th>
            <th>Tác giả</th>
            <th>Ngày đăng</th>
            <th>Ngày cập nhật</th>
            <th>Trạng thái</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
              <tr key={post.id}>
                <td>{idx + 1}</td>
                <td><img src={post.image} alt="" className="post-img" /></td>
                <td><a href="#">{post.title}</a></td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{post.createdAt}</td>
                <td>{post.updatedAt}</td>
                <td><FaEye /></td>
                <td className="action-icons">
                  <FaEdit className="icon" />
                  <FaTrash className="icon" />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9">Không tìm thấy bài viết phù hợp.</td></tr>
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

export default PostList;
