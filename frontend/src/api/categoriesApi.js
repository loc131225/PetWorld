const API_BASE_URL = "http://localhost:8000/api";

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/categories`);
    if (!res.ok) throw new Error("Không thể lấy danh mục");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API chi tiết danh mục", error);
    throw error;
  }
};
