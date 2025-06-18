import React from "react";

const Cart = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="/image/logo.jpg" alt="Logo" />
          </div>

          <div className="searchbar">
            <form action="#">
              <input
                type="search"
                name="keyword"
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

          <div className="cart1">
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

      <div className="container">
        <div className="cart">
          <h2>
            Giỏ Hàng <span style={{ float: "right" }}>3 Sản phẩm</span>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-info">
                      <img src="1.jpg" alt="Product" />
                      <div>
                        {index === 0
                          ? "Fifa 19"
                          : index === 1
                          ? "Glacier White 500GB"
                          : "Tai nghe Platinum"}
                        <br />
                        <small>PS4</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="quantity-control">
                      <button>-</button>
                      <input type="text" defaultValue={index === 0 ? 2 : 1} />
                      <button>+</button>
                    </div>
                  </td>
                  <td>
                    {index === 0
                      ? "£44.00"
                      : index === 1
                      ? "£249.99"
                      : "£139.99"}
                  </td>
                  <td>
                    {index === 0
                      ? "£88.00"
                      : index === 1
                      ? "£249.99"
                      : "£139.99"}
                  </td>
                  <td>
                    <a href="#">
                      <i
                        className="fa-solid fa-delete-left"
                        style={{ color: "#df2316" }}
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href="#"
            style={{
              color: "#5e60ce",
              display: "inline-block",
              marginTop: "15px",
            }}
          >
            « Tiếp tục mua sắm
          </a>
        </div>

        <div className="summary">
          <h2>Tóm tắt đơn hàng</h2>
          <p style={{ marginTop: "32px" }}>
            Số sản phẩm: 3 <span style={{ float: "right" }}>£477.98</span>
          </p>
          <label htmlFor="shipping">Vận chuyển</label>
          <select style={{ marginTop: "15px" }} id="shipping">
            <option>Giao hàng tiêu chuẩn - £3.00</option>
          </select>
          <label htmlFor="promo">Mã khuyến mãi</label>
          <input type="text" id="promo" placeholder="Nhập mã của bạn" />
          <button style={{ background: "#ff5c5c", marginTop: "10px" }}>
            ÁP DỤNG
          </button>
          <div className="summary-total">
            <p>
              Tổng cộng: <span>£480.98</span>
            </p>
          </div>
          <button>THANH TOÁN</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
