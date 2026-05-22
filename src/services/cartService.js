import axios from 'axios';

// Thay thế cổng 7259 bằng cổng chạy thực tế của Backend .NET trên Swagger của bạn
const BASE_URL = 'https://localhost:7259/api/Cart';

const cartService = {
  // 🛒 1. Lấy danh sách sản phẩm trong giỏ hàng theo UserId
  getCart: async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  },

  // ➕ 2. Thêm sản phẩm vào giỏ hàng
  addToCart: async (userId, productId, quantity) => {
    const response = await axios.post(`${BASE_URL}/add`, {
      userId: parseInt(userId),
      productId: parseInt(productId),
      quantity: parseInt(quantity)
    });
    return response.data;
  },

  // 🔄 3. Cập nhật số lượng đè trực tiếp (Dùng khi nhấn nút tăng/giảm + - hoặc thay đổi số lượng ở trang giỏ hàng)
  updateQuantity: async (orderDetailId, newQuantity) => {
    const response = await axios.put(`${BASE_URL}/update`, {
      orderDetailId: orderDetailId,
      newQuantity: parseInt(newQuantity)
    });
    return response.data;
  },

  // ❌ 4. Xóa một sản phẩm ra khỏi giỏ hàng
  removeFromCart: async (orderDetailId) => {
    const response = await axios.delete(`${BASE_URL}/remove/${orderDetailId}`);
    return response.data;
  },

  // 🚀 5. Chốt đơn đặt hàng và trừ kho tồn hệ thống
  checkout: async (userId) => {
    const response = await axios.post(`${BASE_URL}/checkout/${userId}`);
    return response.data;
  }
};

export default cartService;