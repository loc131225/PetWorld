import React, { useState } from 'react';
import '../../css/UserList.css';

import { FaEye, FaPencilAlt } from 'react-icons/fa';

const UserList = () => { // Đảm bảo component UserList được định nghĩa ở đây
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('all');


  const users = [ //
    {
      id: '#0001',
      phone: '0987654321',
      name: 'Nguyễn Thanh Mính Lộc',
      accountType: 'Quản trị viên',
      lastLogin: '03/06/2025 09:42',
      status: 'inactive',
    },
    {
      id: '#0002',
      phone: '0912345678',
      name: 'Nguyễn Hưng',
      accountType: 'Quản trị viên',
      lastLogin: '01/06/2025 17:25',
      status: 'active',
    },
    {
      id: '#0003',
      phone: '0909123456',
      name: 'Võ Trung Hậu',
      accountType: 'Quản trị viên',
      lastLogin: '28/05/2025 13:08',
      status: 'inactive',
    },
    {
      id: '#0004',
      phone: '0977456789',
      name: 'Lý Mạc Sầu',
      accountType: 'Khách hàng',
      lastLogin: '26/05/2025 21:37',
      status: 'inactive',
    },
    {
      id: '#0005',
      phone: '0968123456',
      name: 'Luôn Vui Tươi',
      accountType: 'Khách hàng',
      lastLogin: '22/05/2025 10:56',
      status: 'inactive',
    },
    {
      id: '#0006',
      phone: '0938123456',
      name: 'Ngô Bá Khả',
      accountType: 'Khách hàng',
      lastLogin: '19/05/2025 08:14',
      status: 'inactive',
    },
    {
      id: '#0007',
      phone: '0888123456',
      name: 'Đặng Trần Khánh Đăng',
      accountType: 'Quản trị viên',
      lastLogin: '15/05/2025 15:39',
      status: 'active',
    },
    {
      id: '#0008',
      phone: '0899123456',
      name: 'Nguyễn Trung Kiên',
      accountType: 'Quản trị viên',
      lastLogin: '12/05/2025 18:03',
      status: 'inactive',
    },
    {
      id: '#0009',
      phone: '0941234567',
      name: 'Đàm Vĩnh Hưng',
      accountType: 'Khách hàng',
      lastLogin: '16/06/2025 11:18',
      status: 'inactive',
    },
  ];

  // Đây là dòng 32 trong code mà tôi đã cung cấp, nơi 'users' được sử dụng
  const filteredUsers = users.filter(user =>
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      {/* ... phần JSX còn lại */}
    </div>
  );
};

export default UserList;