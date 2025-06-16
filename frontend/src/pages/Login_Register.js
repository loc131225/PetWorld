import React, { useState, useEffect } from "react";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Auto-hide alerts after 5 seconds
    const timeout = setTimeout(() => {
      document.querySelectorAll(".alert").forEach((alert) => {
        alert.style.animation = "fadeOut 1s forwards";
      });
    }, 5000);

    // Handle close button on alerts
    document.querySelectorAll(".close-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.parentElement.style.animation = "fadeOut 0.5s forwards";
      });
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="login-container">
      <div className={`container1 ${isActive ? "active" : ""}`} id="container1">
        <div className="form-container sign-up">
          <form action="" method="POST">
            <h1>Tạo tài khoản</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <span>hoặc sử dụng email để đăng ký</span>
            <input type="text" name="name" placeholder="Họ và tên" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              required
            />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Nhập lại mật khẩu"
              required
            />
            <button type="submit">Đăng ký</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form action="" method="POST">
            <h1>Đăng nhập</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <span>hoặc sử dụng tài khoản của bạn</span>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              required
            />
            <a href="#">Quên mật khẩu?</a>
            <button type="submit">Đăng nhập</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Chào mừng trở lại!</h1>
              <p>Đăng nhập để sử dụng tất cả các chức năng của trang</p>
              <button id="login" onClick={() => setIsActive(false)}>
                Đăng nhập
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Chào mừng bạn!</h1>
              <p>Đăng ký để sử dụng tất cả các chức năng của trang</p>
              <button id="register" onClick={() => setIsActive(true)}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
