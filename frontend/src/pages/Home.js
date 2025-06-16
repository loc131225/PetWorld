import React from "react";

const Home = () => {
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

      <main>
        <div className="banner">
          <img
            src="/image/banner.png"
            alt="Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="box-voucher">
          <div className="voucher-item">
            <img src="/image/logo.jpg" alt="Voucher 1" />
            <div className="voucher-item-text">
              <b>Dùng CODE: PETWORLD</b>
              <p>Giảm giá 20% cho đơn hàng 0 đồng.</p>
            </div>
          </div>
          <div className="voucher-item">
            <img src="/image/logo.jpg" alt="Voucher 2" />
            <div className="voucher-item-text">
              <b>Dùng CODE: PETWORLD</b>
              <p>Giảm giá 20% cho đơn hàng 0 đồng.</p>
            </div>
          </div>
          <div className="voucher-item">
            <img src="/image/logo.jpg" alt="Voucher 3" />
            <div className="voucher-item-text">
              <b>Dùng CODE: PETWORLD</b>
              <p>Giảm giá 20% cho đơn hàng 0 đồng.</p>
            </div>
          </div>
          <div className="voucher-item">
            <img src="/image/logo.jpg" alt="Voucher 4" />
            <div className="voucher-item-text">
              <b>Dùng CODE: PETWORLD</b>
              <p>Giảm giá 20% cho đơn hàng 0 đồng.</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">Danh mục sản phẩm</h2>
        <div className="box-category">
          <div className="dog-category-item">
            <div className="parent-category">
              <img src="/image/dog.png" alt="Category 1" />
              <h3>Chó</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-food.png" alt="Dog Food" />
              <h3>Thức ăn</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-toy.png" alt="Dog Toy" />
              <h3>Đồ chơi</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-accessory.png" alt="Dog Accessory" />
              <h3>Phụ kiện</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-health.png" alt="Dog Health" />
              <h3>Sức khỏe</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-accessory.png" alt="Dog Accessory" />
              <h3>Phụ kiện</h3>
            </div>
            <div className="category-item">
              <img src="/image/dog-accessory.png" alt="Dog Accessory" />
              <h3>Phụ kiện</h3>
            </div>
          </div>

          <div className="cat-category-item">
            <div className="parent-category">
              <img src="/image/cat.png" alt="Category 2" />
              <h3>Mèo</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-food.png" alt="Cat Food" />
              <h3>Thức ăn</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-toy.png" alt="Cat Toy" />
              <h3>Đồ chơi</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-accessory.png" alt="Cat Accessory" />
              <h3>Phụ kiện</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-health.png" alt="Cat Health" />
              <h3>Sức khỏe</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-accessory.png" alt="Cat Accessory" />
              <h3>Phụ kiện</h3>
            </div>
            <div className="category-item">
              <img src="/image/cat-accessory.png" alt="Cat Accessory" />
              <h3>Phụ kiện</h3>
            </div>
          </div>
        </div>
        <div className="introduce">
          <div className="introduce-text">
            <h2>
              Được hỗ trợ bởi PetWorld: Hành Trình Sức Khỏe Cho Thú Cưng Của Bạn
              Bắt Đầu Tại Đây
            </h2>
            <p>
              PetWorld không chỉ là một thương hiệu — mà là một phong trào dành
              riêng cho thú cưng và những người yêu thương chúng. Trong video
              mới này, hãy khám phá cách PetWorld trao quyền cho các "sen" thông
              qua các sản phẩm đáng tin cậy, lời khuyên từ chuyên gia và một
              cộng đồng thú cưng ngày càng phát triển. Là sức mạnh đứng sau
              Petsy, PetWorld mang đến một tiêu chuẩn chăm sóc mới ngay trên màn
              hình của bạn.
            </p>
          </div>
          <div className="introduce-video">
            <video controls>
              <source src="/image/introduce.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        </div>

        <h2 className="section-title">Sản phẩm phổ biến cho mèo</h2>
        <div className="cat-products">
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/cat-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho mèo, Hạt cá hồi</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/cat-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho mèo, Hạt cá hồi</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/cat-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho mèo, Hạt cá hồi</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/cat-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho mèo, Hạt cá hồi</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="banner">
          <img
            src="/image/banner1.png"
            alt="Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <h2 className="section-title">Sản phẩm phổ biến cho chó</h2>
        <div className="cat-products">
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/dog-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho chó, Hạt thịt gà</h4>
            </div>
            <div className="product-price">
              <del className="old-price">250.000Đ</del>
              <span className="new-price">225.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/dog-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho chó, Hạt thịt gà</h4>
            </div>
            <div className="product-price">
              <del className="old-price">250.000Đ</del>
              <span className="new-price">225.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/dog-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho chó, Hạt thịt gà</h4>
            </div>
            <div className="product-price">
              <del className="old-price">250.000Đ</del>
              <span className="new-price">225.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/dog-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Thức ăn cho chó, Hạt thịt gà</h4>
            </div>
            <div className="product-price">
              <del className="old-price">250.000Đ</del>
              <span className="new-price">225.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <h2 className="section-title">Sản phẩm được chọn nhiều tại PetWorld</h2>
        <div className="cat-products">
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/popular-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Khay đựng thức ăn cho thú cưng</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/popular-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Khay đựng thức ăn cho thú cưng</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/popular-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Khay đựng thức ăn cho thú cưng</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
          <div className="product-item">
            <div className="voucher-event">
              <p>
                <b>Giảm 10%</b> cho đơn hàng từ <b>500.000Đ</b>
              </p>
              <p>
                Sử dụng voucher - <b>PETWORLD</b>
              </p>
            </div>
            <div className="product-image">
              <img src="/image/popular-product1.png" alt="Sản phẩm 1" />
            </div>
            <div className="product-name">
              <h4>Khay đựng thức ăn cho thú cưng</h4>
            </div>
            <div className="product-price">
              <del className="old-price">200.000Đ</del>
              <span className="new-price">180.000Đ</span>
            </div>
            <div className="product-button">
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
              <button className="add-to-wishlist">
                <i className="ph ph-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="more-btn">
          <button className="view-more">Xem thêm</button>
        </div>
        <h2 className="section-title">Tin tức về thú cưng</h2>
        <div className="news-container">
          <div className="news-item">
            <div className="news-image">
              <img
                src="/image/news1.png"
                alt="Tin tức 1"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="news-date">01/01/2023</div>
            <div className="news-title">
              <h3>Chăm sóc thú cưng đúng cách</h3>
            </div>
            <div className="news-content">
              <p>
                Hướng dẫn cách chăm sóc thú cưng để chúng luôn khỏe mạnh và hạnh
                phúc.
              </p>
            </div>
            <div className="news-read-more">
              <button className="read-more">Đọc thêm</button>
            </div>
          </div>
          <div className="news-item">
            <div className="news-image">
              <img
                src="/image/news1.png"
                alt="Tin tức 1"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="news-date">01/01/2023</div>
            <div className="news-title">
              <h3>Chăm sóc thú cưng đúng cách</h3>
            </div>
            <div className="news-content">
              <p>
                Hướng dẫn cách chăm sóc thú cưng để chúng luôn khỏe mạnh và hạnh
                phúc.
              </p>
            </div>
            <div className="news-read-more">
              <button className="read-more">Đọc thêm</button>
            </div>
          </div>
          <div className="news-item">
            <div className="news-image">
              <img
                src="/image/news1.png"
                alt="Tin tức 1"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="news-date">01/01/2023</div>
            <div className="news-title">
              <h3>Chăm sóc thú cưng đúng cách</h3>
            </div>
            <div className="news-content">
              <p>
                Hướng dẫn cách chăm sóc thú cưng để chúng luôn khỏe mạnh và hạnh
                phúc.
              </p>
            </div>
            <div className="news-read-more">
              <button className="read-more">Đọc thêm</button>
            </div>
          </div>
        </div>
        <div className="more-btn">
          <button className="view-more">Xem thêm</button>
        </div>
      </main>

      <footer>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Theo dõi chúng tôi</h3>
          </div>
          <div className="footer-icons">
            <a href="#">
              <i className="ph ph-facebook-logo"></i>
            </a>
            <a href="#">
              <i className="ph ph-instagram-logo"></i>
            </a>
            <a href="#">
              <i className="ph ph-twitter-logo"></i>
            </a>
            <a href="#">
              <i className="ph ph-youtube-logo"></i>
            </a>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Mua sắm ngay</h3>
          </div>
          <div className="footer-links">
            <a href="#">Sản phẩm</a>
            <a href="#">Khuyến mãi</a>
            <a href="#">Tin tức</a>
            <a href="#">Liên hệ</a>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Chính sách</h3>
          </div>
          <div className="footer-links">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Hỗ trợ khách hàng</a>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Về chúng tôi</h3>
          </div>
          <div className="footer-links">
            <a href="#">Giới thiệu</a>
            <a href="#">Tin tức</a>
            <a href="#">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
