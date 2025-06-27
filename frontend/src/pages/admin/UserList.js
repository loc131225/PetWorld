import React, { useState } from 'react';
import avatarImg from '../../assets/myden.jpg';
import { FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../../css/UserList.css';


const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const users = [
    {
      id: '#0001',
      phone: '0987654321',
      name: 'Nguyễn Thanh Mính Lộc',
      email: 'user123@gmail.com',
      accountType: 'Quản trị viên',
      status: 'active',
    },
    {
      id: '#0002',
      phone: '0912345678',
      name: 'Nguyễn Trung Kiên',
      email: 'user123@gmail.com',
      accountType: 'Quản trị viên',
      status: 'active',
    },
    {
      id: '#0003',
      phone: '0909123456',
      name: 'Võ Trung Hậu',
      email: 'user123@gmail.com',
      accountType: 'Quản trị viên',
      status: 'active',
    },
    {
      id: '#0004',
      phone: '0977456789',
      name: 'Đặng Trần Khánh Đăng',
      email: 'user123@gmail.com',
      accountType: 'Quản trị viên',
      status: 'active',
    },
    {
      id: '#0005',
      phone: '0968123456',
      name: 'Nguyễn Hưng',
      email: 'user123@gmail.com',
      accountType: 'Quản trị viên',
      status: 'active',
    },
    {
      id: '#0006',
      phone: '0938123456',
      name: 'G-Dragon',
      email: 'user123@gmail.com',
      accountType: 'Khách hàng',
      status: 'inactive',
    },
    {
      id: '#0007',
      phone: '0888123456',
      name: 'Trịnh Trần Phương Tuấn',
      email: 'user123@gmail.com',
      accountType: 'Khách hàng',
      status: 'active',
    },
    {
      id: '#0008',
      phone: '0899123456',
      name: 'Binz',
      email: 'user123@gmail.com',
      accountType: 'Khách hàng',
      status: 'inactive',
    },
    {
      id: '#0009',
      phone: '0941234567',
      name: 'Hẹ Hẹ Hẹ',
      email: 'user123@gmail.com',
      accountType: 'Khách hàng',
      status: 'inactive',
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchSearch =
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || user.accountType === filterType;
    return matchSearch && matchType;
  });

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
          <div className="global-user">Nguyễn Trung Kiên</div>
          <img src={avatarImg} alt="avatar" className="global-avatar" />
        </div>

        {/* --- PHẦN QUẢN LÝ NGƯỜI DÙNG --- */}
        <div className="user-management" style={{ padding: '50px' }}>
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.phone}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={
                        user.accountType === 'Quản trị viên'
                          ? 'badge admin'
                          : 'badge customer'
                      }
                    >
                      {user.accountType}
                    </span>
                  </td>
                  <td>
                    <button
                      className={user.status === 'active' ? 'btn active' : 'btn inactive'}
                    >
                      {user.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hoá'}
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
