import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ 
      padding: "15px 20px", 
      background: "#000", 
      display: "flex", 
      alignItems: "center",
      gap: "20px" // Tạo khoảng cách giữa các mục để không bị dính icon
    }}>
      {/* 1. Trang Sản phẩm */}
      <Link to="/products" style={linkStyle}>
        Sản phẩm
      </Link>

      {/* 2. Giỏ hàng (Đã sửa vị trí) */}
      <Link to="/cart" style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}>
        <span>🛒</span> Giỏ hàng
      </Link>

      {/* 3. Đăng nhập (Chỉ giữ lại 1 cái và đẩy về bên phải) */}
      <Link to="/login" style={{ ...linkStyle, marginLeft: "auto" }}>
        Đăng nhập
      </Link>
    </nav>
  );
}

// Style dùng chung để code gọn hơn
const linkStyle = { 
  color: "#fff", 
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500"
};