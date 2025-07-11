import React, { useState, useEffect } from 'react';
import avatarImg from '../../assets/myden.jpg';
import { FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../../css/UserList.css';
import { getAllUser } from '../../api/userApi'; 


const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  useEffect(() => {
    getAllUser()
      .then(data => {
        setProduct(data.data)
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

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

        {/* --- PHẦN QUẢN LÝ NGƯỜI DÙNG --- */}
        <div className="user-management" style={{ padding: '50px' }}>
          <h2 className="user-title">Quản lý tài khoản</h2>
          <div className="user-filter">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Lọc người dùng </option>
              <option value="Quản trị viên">Quản trị viên</option>
              <option value="Khách hàng">Khách hàng</option>
            </select>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm thông tin"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Số điện thoại</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Loại tài khoản</th>
                <th>Thao tác</th>
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.phone || "Trống"}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={
                        user.role_id !== null
                          ? 'badge admin'
                          : 'badge customer'
                      }
                    >
                      {user.role_id !== null ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={user.status === 1 ? 'btn active' : 'btn inactive'}
                    >
                      {user.status === 1 ? 'Kích hoạt' : 'Vô hiệu hoá'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
