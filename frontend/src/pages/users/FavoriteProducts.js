import React from "react";
import "../../css/FavoriteProducts.css";
import meo from "../../assets/myden.jpg";


const products = [
  {
    name: "Hạt Whiskas Adult Cho Mèo Trưởng Thành",
    image: meo,
    oldPrice: "360.000đ",
    newPrice: "336.000đ",
  },
  {
    name: "Pate Mèo Mọi Lứa Tuổi LaPaw",
    image: meo,
    oldPrice: "260.000đ",
    newPrice: "220.000đ",
  },
  {
    name: "Thức ăn cho mèo Me-O",
    image: meo,
    oldPrice: "190.000đ",
    newPrice: "169.000đ",
  },
  {
    name: "Hạt Whiskas Adult Cho Mèo Trưởng Thành",
    image: meo,
    oldPrice: "360.000đ",
    newPrice: "336.000đ",
  },
  {
    name: "Pate Mèo Mọi Lứa Tuổi LaPaw",
    image: meo,
    oldPrice: "260.000đ",
    newPrice: "220.000đ",
  },
  {
    name: "Thức ăn cho mèo Me-O",
    image: meo,
    oldPrice: "190.000đ",
    newPrice: "169.000đ",
  },
  
];

const FavoriteProducts = () => {
  return (
    <div className="favorite-products">
      <h2>Sản phẩm yêu thích</h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} className="product-img" />
            <p className="product-name">{item.name}</p>
            <p className="product-price">
              <span className="old-price">{item.oldPrice}</span>
              <span className="new-price">{item.newPrice}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
