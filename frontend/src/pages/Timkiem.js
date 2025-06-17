import React from "react";
import axios from "axios";

// Component sản phẩm đơn
const ProductCard = () => {
  const product = {
    title: "Thức ăn cho mèo, Hạt cá Hồi",
    priceOld: "200.000₫",
    priceNew: "150.000₫",
    image: "https://via.placeholder.com/120", // Thay bằng ảnh thật nếu có
    discountText: "Giảm 10% cho đơn hàng từ 500k\nSử dụng voucher - PetWorld2",
  };

  return (
    <div className="border rounded-lg shadow-md p-4 w-full bg-white flex flex-col justify-between hover:shadow-lg transition">
      <div className="bg-cyan-100 p-2 text-xs font-medium text-center whitespace-pre-line rounded">
        {product.discountText}
      </div>
      <img
        src={product.image}
        alt={product.title}
        className="my-3 h-28 object-contain mx-auto"
      />
      <div className="text-sm font-medium">{product.title}</div>
      <div className="text-gray-400 line-through text-sm">{product.priceOld}</div>
      <div className="text-red-500 font-semibold text-base">{product.priceNew}</div>
      <button className="mt-3 bg-cyan-500 text-white py-1 rounded hover:bg-cyan-600 text-sm">
        Thêm vào giỏ
      </button>
    </div>
  );
};

// Component phân trang
const Pagination = () => {
  const pages = [1, 2, 3, "...", 16];
  return (
    <div className="flex gap-2 mt-6 justify-center">
      {pages.map((page, idx) => (
        <button
          key={idx}
          className="px-3 py-1 border rounded hover:bg-gray-200 text-sm"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

// Component chính
const ProductGrid = () => {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Kết quả tìm kiếm: sản phẩm cho mèo
      </h2>

      <div className="flex justify-end mb-4">
        <button className="border px-4 py-2 rounded text-sm">
          Bộ lọc ▾
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCard key={idx} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default ProductGrid;