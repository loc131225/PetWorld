import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Theo dõi chúng tôi</h3>
          </div>
          <div className="footer-icons">
            <Link to="" >
              <i className="ph ph-facebook-logo"></i>
            </Link>
            <Link to="" >
              <i className="ph ph-instagram-logo"></i>
            </Link>
            <Link to="" >
              <i className="ph ph-twitter-logo"></i>
            </Link>
            <Link to="" >
              <i className="ph ph-youtube-logo"></i>
            </Link>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Mua sắm ngay</h3>
          </div>
          <div className="footer-links">
            <Link to="">Sản phẩm</Link>
            <Link to="">Khuyến mãi</Link>
            <Link to="">Tin tức</Link>
            <Link to="">Liên hệ</Link>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Chính sách</h3>
          </div>
          <div className="footer-links">
            <Link to="">Chính sách bảo mật</Link>
            <Link to="">Điều khoản sử dụng</Link>
            <Link to="">Chính sách đổi trả</Link>
            <Link to="">Hỗ trợ khách hàng</Link>
          </div>
        </div>
        <div className="footer-box">
          <div className="footer-title">
            <h3>Về chúng tôi</h3>
          </div>
          <div className="footer-links">
            <Link to="">Giới thiệu</Link>
            <Link to="">Tin tức</Link>
            <Link to="">Liên hệ</Link>
          </div>
        </div>
      </footer>
    );
}