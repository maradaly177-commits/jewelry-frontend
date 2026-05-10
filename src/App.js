import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Layout (Bắt buộc phải có dòng này thì mới dùng được <MainLayout>)
import MainLayout from "./layouts/MainLayout"; 

// Import Pages
import ProductList from "./pages/Product/ProductList";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart/Cart"; // Kiểm tra lại đường dẫn import này cho đúng với cấu trúc thư mục
import ProductDetail from "./pages/Product/ProductDetail";
function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định vào register */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Auth - Không dùng Layout chung */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Trang sản phẩm - Nên bọc trong MainLayout để có Menu/Header */}
        <Route path="/products" element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        } />

        {/* Trang giỏ hàng - Đã sửa lỗi thiếu Layout */}
        <Route path="/cart" element={
          <MainLayout>
            <Cart />
          </MainLayout>
        } />

        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Route dự phòng khi gõ sai URL */}
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

export default App;