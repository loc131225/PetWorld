import React from 'react';
import '../../css/CommentList.css';
import Sidebar from '../admin/Sidebar';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

const comments = [
  { id: 1, name: 'Trung Kiên', orderCode: 'DC-CM002', content: 'Hii', rating: 4, date: '31/05/2005' },
  { id: 2, name: 'Trung Hậu', orderCode: 'HC-CM002', content: 'okk', rating: 5, date: '31/05/2005' },
  { id: 3, name: 'Minh Lộc', orderCode: 'HC-CM002', content: 'Hàng chất lượng', rating: 4, date: '31/05/2005' },
  { id: 4, name: 'Nguyễn Hưng', orderCode: 'DC-CM002', content: 'Shop giao hàng rất nhanh , đúng mẫu', rating: 5, date: '31/05/2005' },
  { id: 5, name: 'Khánh Đăng', orderCode: 'KM-MN001', content: 'Sản phẩm sài cho chó rất tốt', rating: 4, date: '31/05/2005' },
];

const CommentList = () => {
  return (
    <div className="comment-layout">
      <Sidebar />

      <div className="comment-container">
        <h2>Quản lý bình luận: Danh sách bình luận</h2>

        <div className="comment-controls">
          <input type="text" placeholder="Tìm kiếm theo mã bình luận" />
          <select>
            <option>Loại bình luận</option>
          </select>
          <select>
            <option>Ngày tạo</option>
          </select>
          <button>Lưu bộ lọc</button>
        </div>

        <table className="comment-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người đánh giá</th>
              <th>Mã đơn hàng</th>
              <th>Nội dung</th>
              <th>Số sao</th>
              <th>Ngày đánh giá</th>
              <th>Trạng thái</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td className="user-link">{c.name}</td>
                <td>{c.orderCode}</td>
                <td>{c.content}</td>
                <td>{c.rating} sao</td>
                <td>{c.date}</td>
                <td>
                  <span className="icon" title="Xem"><FaEye /></span>
                </td>
                <td>
                    <FaEdit title="Chỉnh sửa" className="action-icon" />
                  <span className="icon delete-icon" title="Xoá"><FaTrash /></span>
                </td>
              </tr>
            ))}
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
  );
};

export default CommentList;
