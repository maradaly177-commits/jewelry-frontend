import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#000", color: "#fff" }}>
      <Link to="/products" style={{ marginRight: 10 }}>Sản phẩm</Link>
      <Link to="/login">Đăng nhập</Link>
    </nav>
  );
}