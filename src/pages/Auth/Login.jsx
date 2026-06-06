import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://localhost:7259/api/User/Login",
        {
          Email: email,
          Password: password
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ LẤY ĐÚNG USER
      const user = res.data?.data?.user;
      const token = res.data?.data?.token;

      if (!user) {
        setError("Login fail: không có user trả về");
        return;
      }

      // ✅ LƯU ĐÚNG FORMAT
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      navigate("/products");

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Sai tài khoản hoặc mật khẩu, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>ĐĂNG NHẬP</h2>
          <p>Chào mừng bạn quay lại với Jewelry Shop</p>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {error}
            </p>
          )}

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

            <button type="submit" className="btn-login">
              Đăng nhập
            </button>
          </form>

          <div className="register-link">
            Chưa có tài khoản?{" "}
            <span onClick={() => navigate("/register")}>
              Đăng ký ngay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}