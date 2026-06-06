import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        address: "",
        phone: ""
    });

    const navigate = useNavigate();

    const validatePhone = (phone) => {
        return /^(03|05|07|08|09)\d{8}$/.test(phone);
    };

    const handleCheckout = async () => {

        let newErrors = {
            address: "",
            phone: ""
        };

        // ================= VALIDATION =================
        if (!address.trim()) {
            newErrors.address = "Vui lòng nhập địa chỉ";
        } else if (address.trim().length < 10) {
            newErrors.address = "Địa chỉ quá ngắn (>= 10 ký tự)";
        }

        if (!phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!validatePhone(phone.trim())) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        setErrors(newErrors);

        if (newErrors.address || newErrors.phone) return;

        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user") || "{}");

            const res = await axios.post(
                "https://localhost:7259/api/Order/checkout",
                {
                    userId: user?.id || 1,
                    shippingAddress: address.trim(),
                    phone: phone.trim()
                    
                }
            );

            console.log("CHECKOUT RESPONSE:", res.data);

            // ================= FIX ORDER ID =================
            const orderId =
                res.data?.data?.orderId ||
                res.data?.orderId;

            if (!orderId) {
                alert("❌ Không lấy được orderId từ server");
                return;
            }

            // ================= NAVIGATE =================
            navigate(`/order-success/${orderId}`);

        } catch (err) {
            console.error("CHECKOUT ERROR:", err);

            alert(
                err.response?.data?.message ||
                "❌ Thanh toán thất bại (kiểm tra backend hoặc giỏ hàng)"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Thanh toán</h2>

            {/* ADDRESS */}
            <input
                className="checkout-input"
                placeholder="Địa chỉ giao hàng"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
                <p className="error-text">{errors.address}</p>
            )}

            {/* PHONE */}
            <input
                className="checkout-input"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
            />
            {errors.phone && (
                <p className="error-text">{errors.phone}</p>
            )}

            {/* PAYMENT */}
            <select
                className="checkout-input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                <option value="COD">💵 Thanh toán khi nhận hàng</option>
                <option value="BANK">🏦 Chuyển khoản ngân hàng</option>
            </select>

            {/* BUTTON */}
            <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? "⏳ Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>
        </div>
    );
}