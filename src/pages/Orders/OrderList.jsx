import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const userId = user?.id || 1;

   useEffect(() => {
    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                `https://localhost:7259/api/Order/user/${userId}`
            );

            setOrders(res.data || []);
        } catch (err) {
            console.error("Load orders error:", err);
            setOrders([]);
        }
    };

    fetchOrders();
}, [userId]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return {
                    color: "#ff9800",
                    background: "#fff3e0"
                };

            case "CONFIRMED":
                return {
                    color: "#1976d2",
                    background: "#e3f2fd"
                };

            case "SHIPPING":
                return {
                    color: "#9c27b0",
                    background: "#f3e5f5"
                };

            case "DONE":
                return {
                    color: "#2e7d32",
                    background: "#e8f5e9"
                };

            default:
                return {
                    color: "#555",
                    background: "#f5f5f5"
                };
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "CHỜ XÁC NHẬN";

            case "CONFIRMED":
                return "ĐÃ XÁC NHẬN";

            case "SHIPPING":
                return "ĐANG GIAO";

            case "DONE":
                return "HOÀN THÀNH";

            default:
                return status;
        }
    };

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                padding: "20px"
            }}
        >
            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                📦 Đơn mua của tôi
            </h2>

            {orders.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "80px 20px",
                        background: "#fff",
                        border: "1px solid #eee",
                        borderRadius: "12px"
                    }}
                >
                    <div style={{ fontSize: 70 }}>
                        📦
                    </div>

                    <h3>Bạn chưa có đơn hàng nào</h3>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        style={{
                            marginTop: 15,
                            padding: "12px 24px",
                            border: "none",
                            borderRadius: 8,
                            background: "#000",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                    >
                        Mua sắm ngay
                    </button>
                </div>
            ) : (
                orders.map((order) => {
                    const productNames =
                        order.productNames?.split("|") || [];

                    const images =
                        order.images?.split("|") || [];

                    return (
                        <div
                            key={order.id}
                            onClick={() =>
                                navigate(
                                    `/orders/${order.id}`
                                )
                            }
                            style={{
                                border: "1px solid #eee",
                                borderRadius: "12px",
                                padding: "20px",
                                marginBottom: "15px",
                                background: "#fff",
                                cursor: "pointer",
                                boxShadow:
                                    "0 2px 8px rgba(0,0,0,0.05)",
                                transition: "0.2s"
                            }}
                        >
                            {/* HEADER */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    marginBottom: 15
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    Đơn #{order.id}
                                </h3>

                                <span
                                    style={{
                                        padding:
                                            "6px 12px",
                                        borderRadius:
                                            "20px",
                                        fontSize: 12,
                                        fontWeight:
                                            "bold",
                                        ...getStatusStyle(
                                            order.status
                                        )
                                    }}
                                >
                                    {getStatusText(
                                        order.status
                                    )}
                                </span>
                            </div>

                            {/* PRODUCT */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 15,
                                    marginBottom: 15
                                }}
                            >
                                {images.length > 0 && (
                                    <img
                                        src={`/images/${images[0]}`}
                                        alt={
                                            productNames[0]
                                        }
                                        width="90"
                                        height="90"
                                        style={{
                                            objectFit:
                                                "cover",
                                            borderRadius:
                                                "8px",
                                            border:
                                                "1px solid #eee"
                                        }}
                                        onError={(
                                            e
                                        ) => {
                                            e.target.src =
                                                "/images/no-image.jpg";
                                        }}
                                    />
                                )}

                                <div>
                                    <div
                                        style={{
                                            fontWeight:
                                                "bold",
                                            fontSize: 15,
                                            marginBottom:
                                                6
                                        }}
                                    >
                                        {
                                            productNames[0]
                                        }
                                    </div>

                                    {order.itemCount >
                                        1 && (
                                        <div
                                            style={{
                                                color:
                                                    "#666"
                                            }}
                                        >
                                            +
                                            {order.itemCount -
                                                1}{" "}
                                            sản phẩm khác
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* TOTAL */}
                            <div
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                <div
                                    style={{
                                        color:
                                            "#666",
                                        fontSize:
                                            13
                                    }}
                                >
                                    Tổng thanh toán
                                </div>

                                <div
                                    style={{
                                        color:
                                            "#ee4d2d",
                                        fontWeight:
                                            "bold",
                                        fontSize:
                                            24
                                    }}
                                >
                                    {Number(
                                        order.totalAmount ||
                                            0
                                    ).toLocaleString(
                                        "vi-VN"
                                    )}
                                    ₫
                                </div>
                            </div>

                            <div
                                style={{
                                    color: "#666",
                                    marginBottom: 5
                                }}
                            >
                                🛍 {order.itemCount} sản phẩm
                            </div>

                            <div
                                style={{
                                    color: "#888",
                                    fontSize: 13
                                }}
                            >
                                📅{" "}
                                {new Date(
                                    order.orderDate
                                ).toLocaleString(
                                    "vi-VN"
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}