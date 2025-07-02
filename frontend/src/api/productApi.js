const API_BASE_URL = "http://localhost:8000/api";

export const getAllProducts = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products`);
    if (!res.ok) throw new Error("Không thể lấy sản phẩm");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API chi tiết sản phẩm:", error);
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`);
    if (!res.ok) throw new Error("Không thể lấy sản phẩm");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API chi tiết sản phẩm:", error);
    throw error;
  }
};

export const getProductsBySearch = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}/search-products/${query}`);
    if (!res.ok) throw new Error("Không thể tìm kiếm sản phẩm");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API tìm kiếm sản phẩm:", error);
    throw error;
  }
}