import React, { useState } from 'react';
import '../../css/CategoryList.css'; // Import CSS riêng cho trang CategoryList
import { FaPlus, FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; // Import icons cần thiết

const CategoryList = () => {
  // State để quản lý giá trị của thanh tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // State để quản lý loại danh mục được chọn (ví dụ: 'all', 'dog', 'cat')
  const [categoryType, setCategoryType] = useState('all');
  // State để quản lý tùy chọn sắp xếp ngày tạo ('newest', 'oldest')
  const [sortDate, setSortDate] = useState('newest');

  // Dữ liệu mẫu cho danh sách danh mục
  const categories = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50/FF5733/FFFFFF?text=SP1',
      name: 'Sản Phẩm Cho Chó',
      createdAt: '31/05/2005',
      quantity: 20,
      status: 'active', // Trạng thái của danh mục (active/inactive, v.v.)
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50/33FF57/FFFFFF?text=SP2',
      name: 'Sản Phẩm Cho Mèo',
      createdAt: '31/05/2005',
      quantity: 10,
      status: 'active',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50/3357FF/FFFFFF?text=SP3',
      name: 'Sản Phẩm Mới',
      createdAt: '31/05/2005',
      quantity: 5,
      status: 'active',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/50/FF33A1/FFFFFF?text=SP4',
      name: 'Sản Phẩm Bán Chạy',
      createdAt: '31/05/2005',
      quantity: 10,
      status: 'active',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/50/A133FF/FFFFFF?text=SP5',
      name: 'Deal Giá Sốc',
      createdAt: '31/05/2005',
      quantity: 1,
      status: 'active',
    },
  ];

  // Logic lọc danh mục dựa trên thanh tìm kiếm
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
    // Có thể thêm các điều kiện lọc khác ở đây (ví dụ: categoryType)
  );

  return (
    <div className="category-management">
      {/* Phần tiêu đề trang và nút Thêm danh mục */}
      <div className="page-header">
        <h2>Quản lý danh mục: Danh sách danh mục</h2>
        <button className="add-button">
          <FaPlus className="add-icon" />
          Thêm danh mục
        </button>
      </div>

      {/* Phần tìm kiếm và bộ lọc */}
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
            {/* Thêm các tùy chọn loại danh mục khác nếu có */}
          </select>
          <select value={sortDate} onChange={(e) => setSortDate(e.target.value)}>
            <option value="newest">Ngày tạo</option>
            <option value="oldest">Cũ nhất</option>
            {/* Thêm các tùy chọn sắp xếp khác */}
          </select>
          <button className="apply-filter-button">Lưu bộ lọc</button>
        </div>
      </div>

      {/* Bảng hiển thị danh sách danh mục */}
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
                  {/* Sử dụng một span với class để hiển thị trạng thái bằng màu sắc */}
                  <span className={`status-badge ${category.status}`}></span>
                </td>
                <td className="actions">
                  <button className="action-button view-button" title="Xem">
                    <FaEye />
                  </button>
                  <button className="action-button edit-button" title="Sửa">
                    <FaPencilAlt />
                  </button>
                  <button className="action-button delete-button" title="Xóa">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phần phân trang */}
      <div className="pagination">
        <button>&lt;</button> {/* Nút Trang trước */}
        <button className="active">1</button> {/* Trang hiện tại */}
        <button>2</button>
        <button>3</button>
        <button>&gt;</button> {/* Nút Trang kế tiếp */}
      </div>
    </div>
  );
};

export default CategoryList;