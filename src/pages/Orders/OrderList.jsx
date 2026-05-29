import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id || 1;

    // =========================
    // LOAD ORDERS
    // =========================
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `https://localhost:7259/api/Order/user/${userId}`
                );
                setOrders(res.data || []);
            } catch (err) {
                console.error("Lỗi load orders:", err);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div style={{ padding: 20 }}>
            <h2>📦 Đơn mua của tôi</h2>

            {/* =========================
                EMPTY STATE (GIỐNG SHOPEE)
            ========================= */}
            {orders.length === 0 ? (
                <div style={{
                    textAlign: "center",
                    padding: "60px 20px"
                }}>
                    <div style={{ fontSize: "60px" }}>📦</div>

                    <h3 style={{ marginTop: 10 }}>
                        Bạn chưa có đơn hàng nào
                    </h3>

                    <p style={{ color: "#777" }}>
                        Hãy mua sắm để tạo đơn hàng đầu tiên
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        style={{
                            marginTop: 20,
                            padding: "10px 20px",
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Mua sắm ngay
                    </button>
                </div>
            ) : (
                orders.map(order => (
                    <div
                        key={order.id}
                        onClick={() => navigate(`/orders/${order.id}`)}
                        style={{
                            border: "1px solid #ddd",
                            padding: 15,
                            marginBottom: 10,
                            borderRadius: 8,
                            cursor: "pointer",
                            background: "#fff"
                        }}
                    >
                        <p><b>Đơn #</b> {order.id}</p>

                        <p>
                            💰{" "}
                            {Number(order.totalAmount || 0).toLocaleString("vi-VN")} ₫
                        </p>

                        <p>
                            📌 Trạng thái:{" "}
                            <span style={{
                                color:
                                    order.status === "PENDING"
                                        ? "orange"
                                        : order.status === "DONE"
                                        ? "green"
                                        : "blue"
                            }}>
                                {order.status}
                            </span>
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}