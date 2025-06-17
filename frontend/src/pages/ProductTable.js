import React from 'react';

const products = [
  {
    id: 1,
    image: 'product1.jpg',
    name: 'Xịt vệ sinh Răng Miệng Chó Mèo',
    price: 289000,
    discount: 289000,
    quantity: 30,
    createdAt: '31/05/2005',
    status: true,
  },
  {
    id: 2,
    image: 'product2.jpg',
    name: 'Khăn ướt vệ sinh Đa Năng',
    price: 289000,
    discount: 289000,
    quantity: 30,
    createdAt: '31/05/2005',
    status: false,
  },
  // Thêm các sản phẩm khác tương tự
];

const ProductTable = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý sản phẩm: Danh sách sản phẩm</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">STT</th>
            <th className="p-2 border">Ảnh</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">Giá giảm</th>
            <th className="p-2 border">Số lượng</th>
            <th className="p-2 border">Ngày khởi tạo</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">
                <img src={`/assets/products/${item.image}`} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
              </td>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.price.toLocaleString()} đ</td>
              <td className="p-2 border">{item.discount.toLocaleString()} đ</td>
              <td className="p-2 border">{item.quantity}</td>
              <td className="p-2 border">{item.createdAt}</td>
              <td className="p-2 border">
                {item.status ? '👁️' : '🙈'}
              </td>
              <td className="p-2 border">
                ✏️ 🗑️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
