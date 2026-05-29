import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/checkout.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD"); // 🔥 THÊM
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validatePhone = (phone) => {
        return /^(03|05|07|08|09)\d{8}$/.test(phone);
    };

    const handleCheckout = async () => {

        // =====================
        // VALIDATION
        // =====================
        if (!address.trim()) {
            toast.warning("⚠️ Vui lòng nhập địa chỉ giao hàng");
            return;
        }

        if (address.trim().length < 10) {
            toast.warning("⚠️ Địa chỉ quá ngắn");
            return;
        }

        if (!phone.trim()) {
            toast.warning("⚠️ Vui lòng nhập số điện thoại");
            return;
        }

        if (!validatePhone(phone)) {
            toast.warning("⚠️ Số điện thoại không hợp lệ");
            return;
        }

        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await axios.post(
                "https://localhost:7259/api/Order/checkout",
                {
                    userId: user?.id || 1,
                    shippingAddress: address,
                    phone: phone,
                    paymentMethod: paymentMethod // 🔥 QUAN TRỌNG
                }
            );

            const orderId = res.data.orderId;

            toast.success("🎉 Đặt hàng thành công!");

            // =====================
            // FLOW THỰC TẾ
            // =====================
            setTimeout(() => {
                navigate(`/order-success/${orderId}`);
            }, 800);

        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message || "❌ Thanh toán thất bại"
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

            {/* PHONE */}
            <input
                className="checkout-input"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
            />

            {/* PAYMENT METHOD 🔥 */}
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