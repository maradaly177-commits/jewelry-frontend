import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState([]);

    const userId = 1;

    // 🔥 Load cart
    const fetchCart = async () => {
        try {
            const res = await axios.get(
                `https://localhost:7259/api/Cart/${userId}`
            );

            console.log("CART API:", res.data); // 👈 debug quan trọng

            setCart(res.data || []);
        } catch (err) {
            console.error("Lỗi load cart:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // 🔥 Tăng số lượng
    const increase = async (productId) => {
        try {
            await axios.put(
                `https://localhost:7259/api/Cart/increase/${productId}`
            );
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 Giảm số lượng
    const decrease = async (productId) => {
        try {
            await axios.put(
                `https://localhost:7259/api/Cart/decrease/${productId}`
            );
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 Xóa sản phẩm
    const remove = async (productId) => {
        try {
            await axios.delete(
                `https://localhost:7259/api/Cart/remove/${productId}`
            );
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 Tổng tiền (FIX NULL SAFE)
    const total = cart.reduce((sum, item) => {
        const price = Number(item?.price ?? 0);
        const qty = Number(item?.quantity ?? 0);
        return sum + price * qty;
    }, 0);

    return (
        <div style={{ padding: "40px" }}>
            <h2>🛒 GIỎ HÀNG</h2>

            {cart.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.productId}
                            style={{
                                border: "1px solid #ccc",
                                marginBottom: "20px",
                                padding: "15px",
                                display: "flex",
                                gap: "20px",
                            }}
                        >
                            <img
                                src={`/images/${item.image}`}
                                alt={item.productName}
                                style={{ width: "100px" }}
                            />

                            <div style={{ flex: 1 }}>
                                <h4>{item.productName}</h4>

                                {/* 🔥 FIX LỖI PRICE */}
                                <p>
                                    {(item?.price ?? 0).toLocaleString()} đ
                                </p>

                                <div>
                                    <button onClick={() => decrease(item.productId)}>
                                        -
                                    </button>

                                    <span style={{ margin: "0 10px" }}>
                                        {item.quantity}
                                    </span>

                                    <button onClick={() => increase(item.productId)}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <button onClick={() => remove(item.productId)}>
                                ❌ Xóa
                            </button>
                        </div>
                    ))}

                    <h3>
                        Tổng tiền: {total.toLocaleString()} đ
                    </h3>
                </>
            )}
        </div>
    );
}