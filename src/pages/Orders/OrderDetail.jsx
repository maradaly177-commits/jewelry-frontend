import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `https://localhost:7259/api/Order/${id}`
                );

                // ================= FIX QUAN TRỌNG =================
                const data =
                    res.data?.data ??
                    res.data ??
                    [];

                setItems(Array.isArray(data) ? data : []);

            } catch (err) {
                console.error("ORDER DETAIL ERROR:", err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // ================= SAFE REDUCE =================
    const safeItems = Array.isArray(items) ? items : [];

    const subtotal = safeItems.reduce(
        (sum, item) =>
            sum +
            (item.price ?? item.unitPrice ?? 0) *
            (item.quantity ?? 0),
        0
    );

    const shippingFee = subtotal > 1000000 ? 0 : 30000;
    const total = subtotal + shippingFee;

    if (loading) {
        return <div style={{ padding: 20 }}>⏳ Đang tải đơn hàng...</div>;
    }

    if (safeItems.length === 0) {
        return (
            <div style={{ padding: 20 }}>
                <h2>📦 Chi tiết đơn hàng #{id}</h2>
                <p>Không có sản phẩm trong đơn hàng</p>

                <button onClick={() => navigate("/products")}>
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 900, margin: "30px auto", padding: 20 }}>
            <h2>📦 Chi tiết đơn hàng #{id}</h2>

            {safeItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        gap: 20,
                        border: "1px solid #eee",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 15,
                        background: "#fff"
                    }}
                >
                    <img
                        src={
                            item.image
                                ? `/images/${item.image}`
                                : "https://via.placeholder.com/120"
                        }
                        alt={item.productName || ""}
                        style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: 8
                        }}
                    />

                    <div>
                        <h4>{item.productName}</h4>

                        <p>🛍 Số lượng: <b>{item.quantity}</b></p>

                        <p>
                            💵 Đơn giá:{" "}
                            <b>
                                {Number(item.price ?? 0).toLocaleString("vi-VN")} ₫
                            </b>
                        </p>

                        <p>
                            💰 Thành tiền:{" "}
                            <b>
                                {Number(
                                    (item.price ?? 0) * (item.quantity ?? 0)
                                ).toLocaleString("vi-VN")} ₫
                            </b>
                        </p>
                    </div>
                </div>
            ))}

            {/* SUMMARY */}
            <div style={{ textAlign: "right", marginTop: 20 }}>
                <p>
                    Tạm tính: <b>{subtotal.toLocaleString("vi-VN")} ₫</b>
                </p>

                <p>
                    Phí vận chuyển:{" "}
                    <b>
                        {shippingFee === 0
                            ? "Miễn phí"
                            : shippingFee.toLocaleString("vi-VN") + " ₫"}
                    </b>
                </p>

                <h2 style={{ color: "#e53935" }}>
                    Tổng cộng: {total.toLocaleString("vi-VN")} ₫
                </h2>
            </div>

            <button
                onClick={() => navigate("/orders")}
                style={{
                    marginTop: 20,
                    padding: "10px 20px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8
                }}
            >
                Quay lại
            </button>
        </div>
    );
}