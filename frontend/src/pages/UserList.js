import React from 'react';

const UserList = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý tài khoản</h2>
      <div className="flex gap-2 mb-4">
        <select className="border px-3 py-2 rounded">
          <option>Lọc người dùng</option>
          <option>Quản trị viên</option>
          <option>Khách hàng</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm thông tin"
          className="border px-3 py-2 rounded w-1/3"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Họ và tên</th>
            <th className="border p-2">Loại tài khoản</th>
            <th className="border p-2">Lần đăng nhập gần nhất</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">
                <span className={`px-3 py-1 rounded-full text-white text-sm ${user.role === 'Quản trị viên' ? 'bg-green-400' : 'bg-gray-400'}`}>
                  {user.role}
                </span>
              </td>
              <td className="border p-2">{user.lastLogin}</td>
              <td className="border p-2">
                <button className={`px-3 py-1 rounded text-white text-sm ${user.status === 'Kích hoạt' ? 'bg-blue-500' : 'bg-red-500'}`}>
                  {user.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination giả */}
      <div className="mt-4 flex justify-center gap-2">
        <button className="border px-3 py-1 rounded">&lt;</button>
        <button className="border px-3 py-1 rounded bg-blue-500 text-white">1</button>
        <button className="border px-3 py-1 rounded">2</button>
        <button className="border px-3 py-1 rounded">3</button>
        <button className="border px-3 py-1 rounded">&gt;</button>
      </div>
    </div>
  );
};

export default UserList;
