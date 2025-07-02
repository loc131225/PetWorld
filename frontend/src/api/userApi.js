const API_BASE_URL = "http://localhost:8000/api";

export const getAllUser = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`);
    if (!res.ok) throw new Error("Không thể lấy người dùng");
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi gọi API chi tiết người dùng", error);
    throw error;
  }
};
