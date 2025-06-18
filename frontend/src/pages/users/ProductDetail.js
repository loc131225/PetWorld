import React, { useState } from 'react';
import '../../css/ProductDetail.css'; // Import CSS riêng cho ProductDetail

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Dữ liệu sản phẩm liên quan (bạn có thể lấy từ API thực tế)
    const relatedProducts = [
        {
            id: 1,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png" // Đảm bảo đường dẫn này đúng
        },
        {
            id: 2,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
        {
            id: 3,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
        {
            id: 4,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
    ];

    return (
        <div className="product-page-container">
            {/* Phần Thông tin và hình ảnh sản phẩm (từ ảnh 1) */}
            <div className="product-detail-header-container">
                <div className="product-image-section">
                    <img src="/images/product-main.png" alt="Applod Dog Biscuits" className="main-product-image" />
                    <div className="thumbnail-images">
                        <img src="/images/product-thumb1.png" alt="Thumbnail 1" className="thumbnail-image active" />
                        <img src="/images/product-thumb2.png" alt="Thumbnail 2" className="thumbnail-image" />
                    </div>
                </div>
                <div className="product-info-section">
                    <h1>Bánh quy phô mai việt quất Applod cho chó</h1>
                    <p className="product-category">Danh mục: <a href="#sanphamchocho">Sản phẩm cho chó</a>, <a href="#thucanchocho">Thức ăn cho chó</a></p>
                    <div className="product-rating">
                        <span className="stars">★★★★★</span>
                        <span>5.0</span>
                        <span className="separator">|</span>
                        <span>1 Đánh Giá</span>
                    </div>
                    <div className="product-price">
                        <span className="old-price">246.000Đ</span>
                        <span className="current-price">199.000 Đ</span>
                    </div>

                    <div className="product-size">
                        <p>Size: 420g</p>
                        <div className="size-options">
                            <button className="size-button active">420g (350 + 70g)</button>
                            <button className="size-button">845g (650 + 195g)</button>
                        </div>
                    </div>

                    <div className="product-quantity-section">
                        <p>Còn hàng</p>
                        <div className="quantity-control">
                            <button onClick={() => handleQuantityChange('decrease')}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange('increase')}>+</button>
                        </div>
                    </div>

                    <div className="discount-banner">
                        <p>Giảm 10% cho đơn hàng có giá trị trên <strong>500k</strong>, sử dụng Vouchers <strong>PETWORLD1</strong></p>
                    </div>

                    <div className="product-actions">
                        <button className="add-to-cart-button">Thêm vào giỏ</button>
                        <button className="wishlist-button">
                            <svg className="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Phần Mô tả sản phẩm và Đánh giá khách hàng (từ ảnh 2) */}
            <div className="product-description-reviews-container">
                <div className="product-description-section">
                    <h2>Mô tả sản phẩm</h2>
                    <p>Bạn đang tìm kiếm một món ăn vặt ngon miệng và bổ dưỡng, vượt xa những món thưởng thông? Hãy thử ngay Bánh thưởng vị Việt quất & Phô mai cho chó của chúng tôi!</p>
                    <p>Được nuôi dưỡng bằng cả tình yêu thương bởi đội ngũ chuyên gia dinh dưỡng, những người quan tâm đến thú cưng của bạn không kém gì chính bạn. Chúng tôi luôn đảm bảo đây là một sản phẩm chất lượng cao độc đáo và tiện dụng, đảm bảo tiêu chuẩn chất lượng an toàn cao nhất.</p>
                    <p>Chúng tôi đã nghiên cứu kỹ lưỡng và tạo ra Applod Blueberry & Cheese Dog Biscuits được chế biến cẩn thận từ các thành phần lành mạnh, mang lại món ăn nhẹ thơm ngon, đồng thời hỗ trợ sức khỏe và thể trạng cho chú chó của bạn.</p>
                    <p>Việt quất trong công thức cung cấp vitamin, khoáng chất và chất chống oxy hóa dồi dào, hỗ trợ hệ miễn dịch và tiêu hóa. Phô mai mang lại hương vị thơm ngon và nguồn cung cấp canxi giúp xương chắc khỏe.</p>
                    <p>Dù được dùng làm phần thưởng khi huấn luyện, món ăn vặt giải tỏa buồn chán, hay đơn giản là để thể hiện tình yêu thương. Bánh thưởng vị Việt quất & Phô mai của Applod chắc chắn sẽ trở thành món khoái khẩu của cún cưng nhà bạn.</p>
                    <p>Hãy thử một hộp hôm nay và chiều đãi cún cưng của bạn với sự khác biệt đầy ngon lành!</p>

                    <h3>Đặc điểm nổi bật:</h3>
                    <ul>
                        <li>Dễ tiêu hóa và được nuông dưỡng trong lò, dễ nhai và tùy hòa, phù hợp với mọi giống chó.</li>
                        <li>Phù hợp với chó từ 8 tuần tuổi trở lên: hoàn toàn thích hợp cho chó từ 8 tuần tuổi.</li>
                        <li>Hỗ trợ hệ tiêu hóa: Giàu bí đỏ, cà rốt và khoai lang giúp tăng cường tiêu hóa.</li>
                        <li>Phô mai mềm ngon và giàu protein. Bổ sung dưỡng chất hấp dẫn, hỗ trợ bắp, xương và răng chắc khỏe.</li>
                        <li>Việt quất bổ dưỡng: Cung cấp vitamin, khoáng chất và chất chống oxy hóa dồi dào.</li>
                        <li>Dạng viên nhỏ gọn: Tiện phẩm khi huấn luyện và thu vị cho chó ăn vặt.</li>
                    </ul>

                    <h3>Món ăn lý tưởng cho:</h3>
                    <ul>
                        <li>Thưởng cho hành vi tốt</li>
                        <li>Giảm cơn đói giữa buổi</li>
                        <li>Bày tỏ tình yêu thương với thú cưng của bạn</li>
                    </ul>
                </div>

                <div className="customer-reviews-section">
                    <h2>Đánh giá của khách hàng</h2>

                    <div className="review-card">
                        <div className="reviewer-info">
                            <img src="/images/avatar1.png" alt="Nguyen Thanh Minh Loc" className="reviewer-avatar" />
                            <div className="reviewer-details">
                                <span className="reviewer-name">Nguyễn Thanh Minh Lộc</span>
                                <span className="review-date">2024-09-14 18:14</span>
                                <div className="reviewer-rating">
                                    <span className="stars">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        <p className="review-text">Tôi hài lòng với sản phẩm này, thú cưng của tôi rất thích, tôi chắc chắn sẽ quay lại ủng hộ shop</p>
                    </div>

                    <div className="review-card">
                        <div className="reviewer-info">
                            <img src="/images/avatar2.png" alt="Nguyen Van Muoi" className="reviewer-avatar" />
                            <div className="reviewer-details">
                                <span className="reviewer-name">Nguyễn Văn Mười</span>
                                <div className="reviewer-rating">
                                    <span className="stars">☆☆☆☆☆</span> {/* Hiện tại không có sao nào được tô màu */}
                                    <span className="danh-gia-text">Đánh giá: </span>
                                </div>
                            </div>
                        </div>
                        <textarea
                            className="review-textarea"
                            placeholder="Chia sẻ cảm nhận của bạn..."
                        ></textarea>
                        <button className="submit-review-button">Gửi đánh giá</button>
                    </div>
                </div>
            </div>

            {/* Phần "Có thể bạn cũng thích" (từ ảnh 3) */}
            <div className="related-products-section">
                <h2>Có thể bạn cũng thích</h2>
                <div className="product-grid">
                    {relatedProducts.map(product => (
                        <div key={product.id} className="related-product-card">
                            <div className="discount-tag">
                                <p>Giảm 10% cho đơn hàng từ 500k</p>
                                <p>Sử dụng voucher: PetWorld2</p>
                            </div>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-prices">
                                <span className="old-price">{product.oldPrice}</span>
                                <span className="current-price">{product.currentPrice}</span>
                            </div>
                            <div className="product-actions">
                                <button className="add-to-cart-button-small">Thêm vào giỏ</button>
                                <button className="wishlist-button-small">
                                    <svg className="heart-icon-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;