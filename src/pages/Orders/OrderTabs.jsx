import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderTabs from "./OrderTabs";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("ALL");

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const userId = user?.id || 1;

    useEffect(() => {
        loadOrders();
    }, [userId]);

    const loadOrders = async () => {
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

    const filteredOrders =
        filter === "ALL"
            ? orders
            : orders.filter(
                  x => x.status === filter
              );

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "#ff9800";

            case "CONFIRMED":
                return "#2196f3";

            case "SHIPPING":
                return "#9c27b0";

            case "DONE":
                return "#4caf50";

            default:
                return "#9e9e9e";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Chờ xác nhận";

            case "CONFIRMED":
                return "Đã xác nhận";

            case "SHIPPING":
                return "Đang giao";

            case "DONE":
                return "Hoàn thành";

            default:
                return status;
        }
    };

    return (
        <div
            style={{
                padding: 20,
                maxWidth: 900,
                margin: "0 auto"
            }}
        >
            <h2>📦 Đơn mua của tôi</h2>

            <OrderTabs
                active={filter}
                setActive={setFilter}
            />

            {filteredOrders.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: 50
                    }}
                >
                    <div style={{ fontSize: 60 }}>
                        📦
                    </div>

                    <h3>Không có đơn hàng</h3>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        style={{
                            marginTop: 15,
                            padding: "10px 20px",
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}
                    >
                        Mua sắm ngay
                    </button>
                </div>
            ) : (
                filteredOrders.map(order => (
                    <div
                        key={order.id}
                        style={{
                            border: "1px solid #eee",
                            borderRadius: 10,
                            padding: 15,
                            marginBottom: 15,
                            background: "#fff",
                            boxShadow:
                                "0 2px 8px rgba(0,0,0,0.05)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center"
                            }}
                        >
                            <b>
                                Đơn #{order.id}
                            </b>

                            <span
                                style={{
                                    background:
                                        getStatusColor(
                                            order.status
                                        ),
                                    color: "#fff",
                                    padding:
                                        "4px 10px",
                                    borderRadius: 20,
                                    fontSize: 12,
                                    fontWeight:
                                        "bold"
                                }}
                            >
                                {getStatusText(
                                    order.status
                                )}
                            </span>
                        </div>

                        <div
                            style={{
                                marginTop: 10
                            }}
                        >
                            💰{" "}
                            <b>
                                {Number(
                                    order.totalAmount || 0
                                ).toLocaleString(
                                    "vi-VN"
                                )} ₫
                            </b>
                        </div>

                        {order.orderDate && (
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#666"
                                }}
                            >
                                📅{" "}
                                {new Date(
                                    order.orderDate
                                ).toLocaleString(
                                    "vi-VN"
                                )}
                            </div>
                        )}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                    `/orders/${order.id}`
                                );
                            }}
                            style={{
                                marginTop: 12,
                                padding:
                                    "8px 15px",
                                border:
                                    "1px solid #ddd",
                                borderRadius: 6,
                                background:
                                    "#f5f5f5",
                                cursor: "pointer"
                            }}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}