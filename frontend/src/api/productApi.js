// // src/api/productApi.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api'; // sửa nếu dùng domain khác

// export const searchProducts = async (keyword) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/search`, {
//       params: { q: keyword }
//     });
//     return response.data; // giả sử trả về mảng sản phẩm
//   } catch (error) {
//     console.error('Lỗi tìm kiếm:', error);
//     throw error;
//   }
// };
