import React, { useState } from 'react';
import Sidebar from '../admin/Sidebar';
import avatarImg from '../../assets/myden.jpg';
import { FaSearch, FaBell, FaEnvelope, FaBars, FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/VoucherTable.css';

const initialVouchers = [
  {
    name: 'Mùa Hè Cùng Chíu Boss', code: 'SUMMERBOSS10', discount: 'Giảm 10% trên tổng đơn hàng',
    condition: 'Đơn từ 200K, chỉ áp dụng cho mèo.', start: '10/06/2025', end: '24/06/2025'
  },
  {
    name: 'Mùa Hè Cùng Chiếu Boss', code: 'SUMMERBOSS11', discount: 'Giảm 10% trên tổng đơn hàng',
    condition: 'Đơn từ 200K, chỉ áp dụng cho mèo.', start: '10/06/2025', end: '24/06/2025'
  },
  {
    name: 'Mùa Hè Cùng Chiếu Boss', code: 'SUMMERBOSS12', discount: 'Giảm 10% trên tổng đơn hàng',
    condition: 'Đơn từ 200K, chỉ áp dụng cho mèo.', start: '10/06/2025', end: '24/06/2025'
  },
];

const VoucherTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVouchers = initialVouchers.filter(voucher =>
    voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        {/* HEADER */}
        <div className="voucher-header">
          <FaBars className="icon" />
          <FaSearch className="icon" />
          <div className="spacer" />
          <FaBell className="icon red" />
          <FaEnvelope className="icon red" />
          <div className="user">Nguyễn Trung Kiên</div>
          <img src={avatarImg} alt="avatar" className="global-avatar" />
        </div>

        {/* TIÊU ĐỀ VÀ TÌM KIẾM */}
        <h2 className="voucher-title">Quản lý voucher</h2>
        <div className="voucher-controls">
          <select className="voucher-filter">
            <option>Lọc voucher</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm voucher"
            className="voucher-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* BẢNG VOUCHER */}
        <table className="voucher-table">
          <thead>
            <tr>
              <th>Tên chương trình</th>
              <th>Mã khuyến mãi</th>
              <th>Loại giảm giá</th>
              <th>Điều kiện</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td><b>{v.code}</b></td>
                <td>{v.discount}</td>
                <td>{v.condition}</td>
                <td><span className="date start">{v.start}</span></td>
                <td><span className="date end">{v.end}</span></td>
                <td>
                  <FaEdit className="icon edit" />
                  <FaTrash className="icon delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherTable;
