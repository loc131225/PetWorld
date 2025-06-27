import React, { useState } from 'react';
// import { searchProducts } from '../../api/productApi';
import '../../css/TimKiem.css'; // Import CSS riêng cho trang tìm kiếm

const TimKiem = () => {
    // Dữ liệu sản phẩm mẫu (thay thế bằng dữ liệu từ API thực tế)
    const [products, setProducts] = useState([
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
        {
            id: 5,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
        {
            id: 6,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
        {
            id: 7,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
        {
            id: 8,
            name: "Thức ăn cho mèo, Hạt cá Hồi",
            oldPrice: "200.000Đ",
            currentPrice: "150.000Đ",
            image: "/images/product-whiskas.png"
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 16; // Số lượng trang tổng cộng, có thể lấy từ API

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Ở đây bạn có thể gọi API để tải sản phẩm của trang mới
    };

    return (
        <div className="search-page-container">
            <div className="search-header">
                <h1 className="search-title">Kết quả tìm kiếm: sản phẩm cho mèo</h1>
                <div className="filter-sort-section">
                    <select className="filter-dropdown">
                        <option value="">Bộ lọc</option>
                        {/* Thêm các option lọc khác nếu có */}
                    </select>
                </div>
            </div>

            <div className="product-grid-search-page">
                {products.map(product => (
                    <div key={product.id} className="product-card-search-page">
                        <div className="discount-tag-search-page">
                            <p>Giảm 10% cho đơn hàng từ 500k</p>
                            <p>Sử dụng voucher: PetWorld2</p>
                        </div>
                        <img src={product.image} alt={product.name} className="product-image-search-page" />
                        <h3 className="product-name-search-page">{product.name}</h3>
                        <div className="product-prices-search-page">
                            <span className="old-price-search-page">{product.oldPrice}</span>
                            <span className="current-price-search-page">{product.currentPrice}</span>
                        </div>
                        <div className="product-actions-search-page">
                            <button className="add-to-cart-button-search-page">Thêm vào giỏ</button>
                            <button className="wishlist-button-search-page">
                                <svg className="heart-icon-search-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Logic hiển thị trang số 1, 2, 3 và trang cuối cùng (16)
                    // và "..." nếu có quá nhiều trang ở giữa
                    const shouldDisplayPage =
                        pageNumber === 1 ||
                        pageNumber === 2 ||
                        pageNumber === 3 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                    const isGap =
                        (pageNumber === 4 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2);

                    if (shouldDisplayPage) {
                        return (
                            <button
                                key={pageNumber}
                                className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    } else if (isGap) {
                        return <span key={`gap-${pageNumber}`} className="pagination-gap">...</span>;
                    }
                    return null;
                })}
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default TimKiem;