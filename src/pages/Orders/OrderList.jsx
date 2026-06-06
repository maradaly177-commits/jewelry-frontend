import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = Number(user?.id);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `https://localhost:7259/api/Order/user/${userId}`
                );

                const data = res.data?.data ?? res.data;
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setOrders([]);
            }
        };

        if (userId > 0) fetchOrders();
    }, [userId]);

    // =========================
    // STATUS
    // =========================
    const getStatus = (status) => {
        switch (status) {
            case "PENDING":
                return { text: "Chờ xác nhận", color: "#fa8c16" };
            case "CONFIRMED":
                return { text: "Đã xác nhận", color: "#1677ff" };
            case "SHIPPING":
                return { text: "Đang giao", color: "#722ed1" };
            case "DONE":
                return { text: "Hoàn thành", color: "#52c41a" };
            default:
                return { text: status, color: "#999" };
        }
    };

    // =========================
    // 💰 SHIPPING + TOTAL LOGIC (NEW)
    // =========================
    const getSubtotal = (order) => Number(order.totalAmount || 0);

    const getShippingFee = (order) => {
        const subtotal = getSubtotal(order);
        return subtotal >= 1000000 ? 0 : 30000;
    };

    const getFinalTotal = (order) => {
        return getSubtotal(order) + getShippingFee(order);
    };

    return (
        <div style={{
            maxWidth: 950,
            margin: "30px auto",
            padding: 20,
            fontFamily: "Arial"
        }}>
            <h2 style={{
                marginBottom: 20,
                fontSize: 22,
                fontWeight: "bold"
            }}>
                📦 Đơn mua của tôi
            </h2>

            {orders.length === 0 ? (
                <div style={{
                    textAlign: "center",
                    padding: 80,
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #eee"
                }}>
                    <div style={{ fontSize: 60 }}>📦</div>
                    <h3>Chưa có đơn hàng nào</h3>

                    <button
                        onClick={() => navigate("/products")}
                        style={{
                            marginTop: 10,
                            padding: "10px 20px",
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer"
                        }}
                    >
                        Mua sắm ngay
                    </button>
                </div>
            ) : (
                orders.map((order) => {
                    const status = getStatus(order.status);
                    const productNames = order.productNames?.split(", ") || [];
                    const images = order.images?.split(", ") || [];

                    const subtotal = getSubtotal(order);
                    const shipping = getShippingFee(order);
                    const finalTotal = getFinalTotal(order);

                    return (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            style={{
                                background: "#fff",
                                border: "1px solid #eee",
                                borderRadius: 14,
                                padding: 16,
                                marginBottom: 14,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                cursor: "pointer"
                            }}
                        >

                            {/* HEADER */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 10
                            }}>
                                <div style={{ fontWeight: "bold" }}>
                                    🧾 Đơn #{order.id}
                                </div>

                                <span style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color: status.color
                                }}>
                                    {status.text}
                                </span>
                            </div>

                            {/* DATE */}
                            <div style={{
                                fontSize: 12,
                                color: "#888",
                                marginBottom: 10
                            }}>
                                📅 {new Date(order.orderDate).toLocaleString("vi-VN")}
                            </div>

                            {/* PRODUCT */}
                            <div style={{
                                display: "flex",
                                gap: 12,
                                background: "#fafafa",
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 10
                            }}>
                                <img
                                    src={
                                        images[0]
                                            ? `/images/${images[0]}`
                                            : "/images/no-image.jpg"
                                    }
                                    alt=""
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 8,
                                        objectFit: "cover"
                                    }}
                                />

                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: "bold" }}>
                                        {productNames[0]}
                                    </div>

                                    {order.itemCount > 1 && (
                                        <div style={{
                                            fontSize: 12,
                                            color: "#888",
                                            marginTop: 5
                                        }}>
                                            +{order.itemCount - 1} sản phẩm khác
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 💰 TOTAL DETAIL (NEW UI) */}
                            <div style={{
                                borderTop: "1px solid #eee",
                                paddingTop: 10
                            }}>
                                <div style={{ fontSize: 13, color: "#666" }}>
                                    Tạm tính: {subtotal.toLocaleString("vi-VN")} ₫
                                </div>

                                <div style={{ fontSize: 13, color: "#666" }}>
                                    Phí vận chuyển: {
                                        shipping === 0
                                            ? "Miễn phí"
                                            : shipping.toLocaleString("vi-VN") + " ₫"
                                    }
                                </div>

                                <div style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#ee4d2d",
                                    marginTop: 5
                                }}>
                                    Tổng thanh toán: {finalTotal.toLocaleString("vi-VN")} ₫
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 10
                            }}>
                                <div style={{ fontSize: 12, color: "#666" }}>
                                    📦 {order.itemCount} sản phẩm
                                </div>
                            </div>

                        </div>
                    );
                })
            )}
        </div>
    );
}