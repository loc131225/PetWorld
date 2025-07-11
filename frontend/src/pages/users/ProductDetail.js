import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../api/productApi';
import '../../css/ProductDetail.css';
import { formatVND } from '../../utils/formatPrice';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const imageBaseUrl = 'http://localhost:8000/storage/products/';

    useEffect(() => {
        getProductBySlug(slug)
            .then(data => setProduct(data.data.product))
            .catch(err => console.error(err));
    }, [slug]);

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (!product) return <div>Đang tải thông tin sản phẩm...</div>;

    return (
        <div className="product-page-container">
            <div className="product-detail-header-container">
                <div className="product-image-section">
                    <img
                        src={imageBaseUrl + product.image}
                        alt={product.name}
                        className="main-product-image"
                    />
                    {product.second_image && (
                        <img
                            src={imageBaseUrl + product.second_image}
                            alt="Ảnh phụ"
                            className="second-product-image"
                        />
                    )}
                </div>

                <div className="product-info-section">
                    <h1>{product.name}</h1>
                    <p className="product-category">Danh mục: {product.category_name || 'Chưa cập nhật'}</p>

                    <div className="product-rating">
                        <span className="stars">★★★★★</span>
                        <span>5.0</span>
                        <span className="separator">|</span>
                        <span>1 Đánh Giá</span>
                    </div>

                    <div className="product-price">
                        <span className="old-price">{formatVND(Number(product.price))}</span>
                        <span className="current-price">{formatVND(Number(product.sale_price))}</span>
                    </div>

                    <div className="product-size">
                        <p>Kích cỡ:</p>
                        <div className="size-options">
                            {product.attributes[0]?.attribute_values.map(attr => (
                                <button key={attr.id} className="size-button">{attr.value}</button>
                            ))}
                        </div>
                    </div>

                    <div className="product-quantity-section">
                        <p>{product.stock_quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
                        <div className="quantity-control">
                            <button onClick={() => handleQuantityChange('decrease')}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange('increase')}>+</button>
                        </div>
                    </div>

                    <div className="discount-banner">
                        <p>Giảm 10% cho đơn hàng trên <strong>500k</strong>, sử dụng Voucher <strong>PETWORLD1</strong></p>
                    </div>

                    <div className="product-actions">
                        <button className="add-to-cart-button">Thêm vào giỏ</button>
                        <button className="wishlist-button">
                            <svg className="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81
                                         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
                                         6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-description-reviews-container">
                <div className="product-description-section">
                    <h2>Mô tả sản phẩm</h2>
                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </div>

                <div className="customer-reviews-section">
                    <h2>Đánh giá của khách hàng</h2>
                    <p>Hiện chưa có đánh giá.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
