import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Cart.css";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const userId = 1;
    const API = "https://localhost:7259/api/Cart";

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${API}/${userId}`);
            setCart(res.data || []);
        } catch (err) {
            console.error("Lỗi load cart:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const getProductId = (item) => item.productId;

    const increase = async (item) => {
        const id = getProductId(item);
        if (!id) return;
        await axios.put(`${API}/increase/${id}`);
        fetchCart();
    };

    const decrease = async (item) => {
        const id = getProductId(item);
        if (!id) return;
        await axios.put(`${API}/decrease/${id}`);
        fetchCart();
    };

    const remove = async (item) => {
        const id = getProductId(item);
        if (!id) return;
        await axios.delete(`${API}/remove/${id}`);
        fetchCart();
    };

    // =========================
    // FIX PRICE SAFE
    // =========================
    const getPrice = (item) =>
        item.unitPrice ??
        item.UnitPrice ??
        item.price ??
        item.Price ??
        0;

    // =========================
    // FIX TOTAL
    // =========================
    const total = cart.reduce((sum, item) => {
        const price = getPrice(item);
        const qty = item.quantity ?? item.Quantity ?? 0;
        return sum + price * qty;
    }, 0);

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Giỏ hàng đang trống</p>
                    <button onClick={() => navigate("/products")}>
                        Tiếp tục mua sắm
                    </button>
                </div>
            ) : (
                <div className="cart-wrapper">

                    {/* LEFT */}
                    <div className="cart-list">
                        {cart.map((item) => (
                            <div key={item.id || item.productId} className="cart-item">

                                <img
                                    className="cart-img"
                                    src={
                                        item.image
                                            ? `/images/${item.image}`
                                            : "/images/default.jpg"
                                    }
                                    alt={item.productName}
                                />

                                <div className="cart-info">
                                    <h4>{item.productName}</h4>
                                    <p className="sku">SKU: JDR-789</p>

                                    <div className="price">
                                        {Number(getPrice(item)).toLocaleString("vi-VN")} đ
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <div className="qty-controls">
                                        <button onClick={() => decrease(item)}>-</button>
                                        <span>
                                            {item.quantity ?? item.Quantity ?? 0}
                                        </span>
                                        <button onClick={() => increase(item)}>+</button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => remove(item)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="cart-summary">
                        <h3>Tổng đơn hàng</h3>

                        <div className="summary-row">
                            <span>Tạm tính</span>
                            <span>{total.toLocaleString("vi-VN")} đ</span>
                        </div>

                        <div className="summary-row total">
                            <span>Tổng</span>
                            <span>{total.toLocaleString("vi-VN")} đ</span>
                        </div>

                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Thanh toán
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}