import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Login.css"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state để chứa lỗi

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ trước khi thử đăng nhập mới

    try {
      const response = await axios.post("https://localhost:7259/api/User/Login", {
        Email: email,
        Password: password
      });

      // Đăng nhập thành công: Lưu dữ liệu và chuyển trang ngay
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/products"); 
      
    } catch (error) {
      // Đăng nhập thất bại: Set lỗi vào state để hiển thị lên UI
      console.error("Lỗi đăng nhập:", error);
      setError("Sai tài khoản hoặc mật khẩu, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <div className="login-card"> 
          <h2>ĐĂNG NHẬP</h2>
          <p>Chào mừng bạn quay lại với Jewelry Shop</p>
          
          {/* HIỂN THỊ THÔNG BÁO LỖI MÀU ĐỎ */}
          {error && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-login">Đăng nhập</button>
          </form>

          <div className="register-link">
            Chưa có tài khoản? <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
          </div>
        </div>
      </div>
    </div>
  );
}