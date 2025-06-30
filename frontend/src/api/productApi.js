const API_BASE_URL = "http://localhost:8000/api";

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
