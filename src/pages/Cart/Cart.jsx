import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Cart.css";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const API = "https://localhost:7259/api/Cart";

    // =========================
    // GET USER SAFE
    // =========================
    const getUserId = () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user?.id;
    };

    const userId = getUserId();

    // =========================
    // FETCH CART
    // =========================
    const fetchCart = useCallback(async () => {
        try {
            if (!userId) return;

            const res = await axios.get(`${API}/${userId}`);
            const data = res.data?.data || [];

            setCart(data);

        } catch (err) {
            console.error("Lỗi load cart:", err);
            setCart([]);
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // =========================
    // PRODUCT ID SAFE
    // =========================
    const getProductId = (item) => item.productId ?? item.ProductId;

    // =========================
    // INCREASE
    // =========================
    const increase = async (item) => {
        const id = getProductId(item);
        if (!id) return;

        await axios.put(`${API}/increase/${id}?userId=${userId}`);
        fetchCart();
    };

    // =========================
    // DECREASE
    // =========================
    const decrease = async (item) => {
        const id = getProductId(item);
        if (!id) return;

        await axios.put(`${API}/decrease/${id}?userId=${userId}`);
        fetchCart();
    };

    // =========================
    // REMOVE
    // =========================
    const remove = async (item) => {
        const id = getProductId(item);
        if (!id) return;

        await axios.delete(`${API}/remove/${id}?userId=${userId}`);
        fetchCart();
    };

    // =========================
    // PRICE SAFE
    // =========================
    const getPrice = (item) =>
        item.unitPrice ??
        item.UnitPrice ??
        item.price ??
        item.Price ??
        0;

    // =========================
    // TOTAL
    // =========================
    const subtotal = cart.reduce((sum, item) => {
        const price = getPrice(item);
        const qty = item.quantity ?? item.Quantity ?? 0;
        return sum + price * qty;
    }, 0);

    // =========================
    // SHIPPING LOGIC
    // =========================
    const shippingFee = subtotal >= 1000000 ? 0 : 30000;

    const finalTotal = subtotal + shippingFee;

    // =========================
    // UI
    // =========================
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
                        {cart.map((item, index) => (
                            <div key={item.id || item.productId || index} className="cart-item">

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
                            <span>{subtotal.toLocaleString("vi-VN")} đ</span>
                        </div>

                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span>
                                {shippingFee === 0
                                    ? "Miễn phí"
                                    : shippingFee.toLocaleString("vi-VN") + " đ"}
                            </span>
                        </div>

                        <div className="summary-row total">
                            <span>Tổng thanh toán</span>
                            <span>{finalTotal.toLocaleString("vi-VN")} đ</span>
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