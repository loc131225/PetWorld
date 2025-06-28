import React from 'react';
import '../../css/Dashboard.css';
import { FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import Sidebar from './Sidebar';
import avatarImg from '../../assets/myden.jpg';
const GlobalHeader = () => {
  return (
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
  );
};

// === DashboardHeader Component ===
// This component content has been moved to GlobalHeader, so it will render nothing.
const DashboardHeader = () => {
  return null;
};

// === StatCard Component ===
const StatCard = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-value">{value}</div>
      </div>
      <div className="stat-card-icon">{icon}</div>
    </div>
  );
};

// === RevenueChart Component ===
const RevenueChart = () => {
  return (
    <div>
      <div className="card-title">Doanh thu theo tháng</div>
      <div className="revenue-chart-total">
        💰 Tổng doanh thu: <span>1.234.567Đ</span>
      </div>
      <div className="card-subtitle">
        Đường thể hiện doanh thu theo tháng
      </div>
      <div className="chart-placeholder">
        [Biểu đồ doanh thu - Placeholder]
        <br/>
        <small>Bảng thống kê doanh thu của trang web</small>
      </div>
    </div>
  );
};

// === NewUsersChart Component ===
const NewUsersChart = () => {
  return (
    <div>
      <div className="card-title">Người dùng mới theo tháng</div>
      <div className="chart-placeholder" style={{ height: '200px' }}>
        [Biểu đồ người dùng mới - Placeholder]
        <br/>
        <small>Biểu đồ số người dùng mới theo tháng</small>
      </div>
    </div>
  );
};

// === ProductSalesChart Component ===
const ProductSalesChart = () => {
  return (
    <div>
      <div className="card-title">Doanh số sản phẩm theo danh mục</div>
      <div className="chart-placeholder" style={{ height: '200px' }}>
        [Biểu đồ doanh số sản phẩm theo danh mục - Placeholder]
        <br/>
        <small>Bảng thống kê số sản phẩm theo danh mục</small>
      </div>
    </div>
  );
};

// === OrderSummary Component ===
const OrderSummary = () => {
  return (
    <div className="recent-orders-header">
      <div className="card-title">
        BÁO CÁO ĐƠN HÀNG MỚI
        <div className="recent-orders-count">8 ĐƠN HÀNG</div>
      </div>
      <div className="card-subtitle">7 ngày gần đây</div>
    </div>
  );
};

// === RecentOrdersTable Component ===
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Chờ xác nhận':
      return 'status-cho-xac-nhan';
    case 'Đang xử lý':
      return 'status-dang-xu-ly';
    case 'Giao thành công':
      return 'status-giao-thanh-cong';
    case 'Đã hủy':
      return 'status-da-huy';
    default:
      return '';
  }
};

const RecentOrdersTable = ({ orders }) => {
  return (
    <>
      <table className="recent-orders-table">
        <thead>
          <tr>
            <th>Tên người mua</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Tổng đơn</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.buyer}</td>
              <td>
                <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="view-all-orders">
        <a href="#">Xem tất cả đơn hàng &gt;&gt;</a>
      </div>
    </>
  );
};

// === WeatherWidget Component ===
const WeatherWidget = ({ data }) => {
  const { current, forecast } = data;

  return (
    <div>
      <div className="card-title">Thời tiết</div>

      <div className="weather-current-info">
        <div className="weather-temp">{current.temp}</div>
        <div className="weather-condition">{current.condition}</div>
        <div className="weather-date">Thứ Sáu <br/> {current.date}</div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <span>Tốc độ gió</span>
          <span>{current.windSpeed}</span>
        </div>
        <div className="weather-detail-item">
          <span>Mặt trời mọc</span>
          <span>{current.sunrise}</span>
        </div>
        <div className="weather-detail-item">
          <span>Độ ẩm</span>
          <span>{current.humidity}</span>
        </div>
      </div>

      <div className="weather-forecast">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-item-day">{item.day}</div>
            <div className="forecast-item-icon">{item.icon}</div>
            <div className="forecast-item-temp">{item.temp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


// === Main Dashboard Component ===
function Dashboard() {
  const stats = [
    { label: 'Doanh thu', value: '1.234.567 đ', icon: '💰' },
    { label: 'Đơn hàng đã hoàn thành', value: '123 đơn', icon: '📦' },
    { label: 'Người dùng', value: '4.567 người', icon: '👤' },
    { label: 'Sản phẩm tồn kho', value: '500 sản phẩm', icon: '📦' },
  ];

  const recentOrders = [
    { buyer: 'Minh Lộc', status: 'Chờ xác nhận', date: '17/08/2025', total: '600.000Đ' },
    { buyer: 'Trung Hậu', status: 'Đang xử lý', date: '17/08/2025', total: '123.000Đ' },
    { buyer: 'Văn Tèo', status: 'Đang xử lý', date: '16/08/2025', total: '456.000Đ' },
    { buyer: 'Vui Tươi', status: 'Giao thành công', date: '16/08/2025', total: '112.000Đ' },
    { buyer: 'Lý Mạc Sầu', status: 'Chờ xác nhận', date: '16/08/2025', total: '224.000Đ' },
    { buyer: 'Hưng Nguyên', status: 'Đã hủy', date: '15/08/2025', total: '336.000Đ' },
    { buyer: 'Kiên', status: 'Đã hủy', date: '15/08/2025', total: '448.000Đ' },
    { buyer: 'Đàm Vĩnh Hưng', status: 'Giao thành công', date: '14/08/2025', total: '555.000Đ' },
  ];

  const weatherData = {
    current: {
      temp: '32°C',
      condition: 'Mưa nhẹ',
      windSpeed: '10 km/h',
      humidity: '74%',
      sunrise: '5:00 AM',
      date: '28/06/2025' // Current date: Friday, June 28, 2025
    },
    forecast: [
      { day: 'Thứ Sáu', temp: '32°', icon: '🌧️' },
      { day: 'Thứ Bảy', temp: '31°', icon: '☁️' },
      { day: 'Chủ Nhật', temp: '30°', icon: '☁️' },
      { day: 'Thứ Hai', temp: '33°', icon: '☁️' },
      { day: 'Thứ Ba', temp: '32°', icon: '☁️' },
      { day: 'Thứ Tư', temp: '32°', icon: '☁️' },
      { day: 'Thứ Năm', temp: '32°', icon: '☁️' },
      { day: 'Thứ Sáu', temp: '32°', icon: '☁️' },
    ]
  };

  return (
    <div style={{ display: 'flex' }}> {/* Flex container for sidebar and main content */}
      <Sidebar />
      <div className="main-content-wrapper"> {/* Wrapper for header and dashboard content */}
        <GlobalHeader />
        <div className="dashboard-page-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} />
            ))}
          </div>

          <div className="charts-and-widgets-grid">
            <div className="chart-card large">
              <RevenueChart />
            </div>
            <div className="chart-card medium">
              <NewUsersChart />
            </div>
            <div className="chart-card small">
              <ProductSalesChart />
            </div>
            <div className="recent-orders-section">
              <OrderSummary />
              <RecentOrdersTable orders={recentOrders} />
            </div>
            <div className="weather-section">
              <WeatherWidget data={weatherData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;