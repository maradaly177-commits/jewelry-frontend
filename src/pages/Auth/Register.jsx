import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Register.css"; // Đảm bảo đường dẫn này đúng để nhận CSS

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5278/api/User/Register", {
                Email: email,
                Password: password,
                FullName: fullName
            });

            if (response.status === 200) {
                alert("Đăng ký thành công!");
                navigate("/login"); // Chuyển sang trang đăng nhập
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error.response?.data);
            // Hiển thị thông báo lỗi cụ thể từ Backend (ví dụ: Email đã tồn tại)
            alert("Đăng ký thất bại: " + (error.response?.data?.message || "Email đã tồn tại hoặc lỗi server"));
        }
    };

    return (
        <div className="register-page"> {/* Lớp bao phủ toàn màn hình có ảnh nền */}
            <div className="register-container">
                <div className="register-card"> {/* Thẻ chứa form với hiệu ứng kính mờ */}
                    <h2>Đăng ký tài khoản</h2>
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Họ và tên" 
                                onChange={(e) => setFullName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Mật khẩu" 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-register">Đăng ký ngay</button>
                    </form>
                    
                    {/* Thêm link để người dùng quay lại trang đăng nhập */}
                    <p style={{ marginTop: "20px", fontSize: "14px", color: "#333" }}>
                        Đã có tài khoản?{" "}
                        <span 
                            onClick={() => navigate("/login")} 
                            style={{ color: "#d4af37", cursor: "pointer", fontWeight: "bold" }}
                        >
                            Đăng nhập
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}