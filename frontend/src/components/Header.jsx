export default function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="/image/logo.jpg" alt="Logo" />
          </div>

          <div className="searchbar">
            <form action="/Timkiem" method="get">
              <input
                type="search"
                name="search"
                autoComplete="off"
                placeholder="Nhập từ khóa để tìm kiếm..."
              />
              <button type="submit">
                <i className="ph ph-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div className="user-actions">
            <div className="dropdown">
              <button className="dropbtn">
                <i className="ph ph-user"></i> Đăng nhập / Đăng ký
              </button>
              <div className="dropdown-content">
                <a href="#">Đăng nhập</a>
                <a href="#">Đăng ký</a>
                <a href="#">Thông tin cá nhân</a>
                <a href="#">Đăng xuất</a>
              </div>
            </div>
          </div>

          <div className="cart">
            <a href="#">
              <i className="ph ph-shopping-bag"></i> Giỏ hàng
            </a>
          </div>
        </div>
      </header>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="#">Trang chủ</a>
          </li>
          <li>
            <a href="#">Giới thiệu</a>
          </li>
          <li>
            <a href="#">Dành cho mèo</a>
            <ul>
              <li>
                <a href="#">Thức ăn</a>
              </li>
              <li>
                <a href="#">Đồ chơi</a>
              </li>
              <li>
                <a href="#">Phụ kiện</a>
              </li>
              <li>
                <a href="#">Sức khỏe</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Dành cho chó</a>
            <ul>
              <li>
                <a href="#">Thức ăn</a>
              </li>
              <li>
                <a href="#">Đồ chơi</a>
              </li>
              <li>
                <a href="#">Phụ kiện</a>
              </li>
              <li>
                <a href="#">Sức khỏe</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Sản phẩm</a>
          </li>
          <li>
            <a href="#">Tin tức</a>
          </li>
          <li>
            <a href="#">Liên hệ</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
