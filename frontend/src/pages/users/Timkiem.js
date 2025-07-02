import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getProductsBySearch } from '../../api/productApi';
import '../../css/TimKiem.css'; 

const TimKiem = () => {
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [products, setProducts] = useState([]);
    useEffect(() => {
            getProductsBySearch(searchQuery)
                .then(data => {
                    setProducts(data.data)
                    setLoading(false);
                }) 
                .catch(err => console.error(err));
        }, [searchQuery]);
    // Dữ liệu sản phẩm mẫu (thay thế bằng dữ liệu từ API thực tế)
    

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
                {loading && <div className="loading-message">Đang tải sản phẩm...</div>}
                {!loading && products.length === 0 && (
                    <div className="no-results-message">Không có sản phẩm nào phù hợp với tìm kiếm của bạn.</div>
                )}
                {products.map(product => (
                    <Link to={`/ProductDetail/${product.slug}`} key={product.id} className="product-card-search-page">
                        <div className="discount-tag-search-page">
                            <p>Giảm 10% cho đơn hàng từ 500k</p>
                            <p>Sử dụng voucher: PetWorld2</p>
                        </div>
                        <img src={product.image} alt={product.name} className="product-image-search-page" />
                        <h3 className="product-name-search-page">{product.name}</h3>
                        <div className="product-prices-search-page">
                            <span className="old-price-search-page">{product.price}</span>
                            <span className="current-price-search-page">{product.sale_price}</span>
                        </div>
                        <div className="product-actions-search-page">
                            <button className="add-to-cart-button-search-page">Thêm vào giỏ</button>
                            <button className="wishlist-button-search-page">
                                <svg className="heart-icon-search-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>
                    </Link>
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