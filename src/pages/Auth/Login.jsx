import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Login.css"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      // 1. Sửa URL sang cổng 7259 (HTTPS) theo log backend
      const response = await axios.post("https://localhost:7259/api/User/Login", {
        Email: email,
        Password: password
      });

      console.log("Dữ liệu User:", response.data);
      
      // Lưu thông tin đăng nhập vào LocalStorage nếu cần
      // localStorage.setItem("user", JSON.stringify(response.data));

      alert("Đăng nhập thành công!");
      
      // 2. Chuyển hướng đúng về trang danh sách sản phẩm
      navigate("/products"); 
      
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data);
      // Nếu cổng 7259 lỗi, hãy thử kiểm tra lại endpoint trong Swagger
      alert(error.response?.data?.message || "Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <div className="login-card"> 
          <h2>ĐĂNG NHẬP</h2>
          <p>Chào mừng bạn quay lại với Jewelry Shop</p>
          
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