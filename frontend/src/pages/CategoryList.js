import React from 'react';
import './CategoryList.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'Sản Phẩm Cho Chó',
    image: '/images/dog.jpg',
    date: '31/05/2005',
    quantity: 20,
  },
  {
    id: 2,
    name: 'Sản Phẩm Cho Mèo',
    image: '/images/cat.jpg',
    date: '31/05/2005',
    quantity: 10,
  },
  {
    id: 3,
    name: 'Sản Phẩm Mới',
    image: '/images/new.jpg',
    date: '31/05/2005',
    quantity: 5,
  },
  {
    id: 4,
    name: 'Sản Phẩm Bán Chạy',
    image: '/images/best.jpg',
    date: '31/05/2005',
    quantity: 10,
  },
  {
    id: 5,
    name: 'Deal Giá Sốc',
    image: '/images/deal.jpg',
    date: '31/05/2005',
    quantity: 1,
  },
];

const CategoryList = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý danh mục: Danh sách danh mục</h2>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã danh mục, tên danh mục"
          className="border px-3 py-2 rounded w-1/3"
        />
        <div className="flex gap-2">
          <button className="border px-3 py-2 rounded">Loại danh mục</button>
          <button className="border px-3 py-2 rounded">Ngày tạo</button>
          <button className="border px-3 py-2 rounded">Lưu bộ lọc</button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded">+ Thêm danh mục</button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">STT</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Ngày khởi tạo</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
              </td>
              <td className="border p-2 text-blue-600 cursor-pointer">{item.name}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2 text-center"><FaEye className="mx-auto text-gray-500" /></td>
              <td className="border p-2 flex gap-2 justify-center">
                <FaEye className="text-blue-500 cursor-pointer" />
                <FaEdit className="text-green-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
