import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa"; // Đảm bảo đã cài react-icons

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mỗi khi trang tải, kiểm tra xem có thông tin user không
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Chuyển đổi thành true nếu có dữ liệu
  }, []); // [] đảm bảo chỉ chạy 1 lần khi load trang

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px 20px", background: "#000", display: "flex", alignItems: "center", gap: "20px" }}>
      <Link to="/products" style={linkStyle}>Sản phẩm</Link>
      <Link to="/cart" style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}>
        <span>🛒</span> Giỏ hàng
      </Link>

      <div style={{ marginLeft: "auto" }}>
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUser style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }} />
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer" }}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" style={linkStyle}>Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = { color: "#fff", textDecoration: "none", fontSize: "16px", fontWeight: "500" };