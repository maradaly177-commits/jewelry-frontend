import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // =========================
  // LOAD USER + AUTO SYNC
  // =========================
  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    getUser();

    // sync khi login/logout ở tab khác
    window.addEventListener("storage", getUser);

    return () => window.removeEventListener("storage", getUser);
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "15px 20px",
        background: "#000",
        display: "flex",
        alignItems: "center",
        gap: "20px"
      }}
    >
      {/* LINKS */}
      <Link to="/products" style={linkStyle}>
        Sản phẩm
      </Link>

      <Link
        to="/cart"
        style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "5px" }}
      >
        🛒 Giỏ hàng
      </Link>

      <Link to="/orders" style={linkStyle}>
        📦 Đơn mua
      </Link>

      {/* RIGHT SIDE */}
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUser style={{ color: "#fff", fontSize: "20px" }} />

            {/* KHÔNG HIỆN "User" NỮA */}
            {user?.username && (
              <span style={{ color: "#d4af37" }}>
                {user.username}
              </span>
            )}

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#d4af37",
                cursor: "pointer"
              }}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" style={linkStyle}>
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500"
};