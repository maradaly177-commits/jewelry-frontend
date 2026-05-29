import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `https://localhost:7259/api/orders/${id}`
                );

                // 👉 hỗ trợ cả 2 kiểu backend trả về
                setOrder(res.data || null);

            } catch (err) {
                console.error(err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    // LOADING
    if (loading) {
        return <div style={{ padding: 20 }}>⏳ Đang tải đơn hàng...</div>;
    }

    // EMPTY
    if (!order || !order.items || order.items.length === 0) {
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
        <div style={{ padding: 20 }}>
            {/* HEADER ORDER */}
            <h2>📦 Đơn hàng #{order.orderId || id}</h2>

            <p>📌 Trạng thái: {order.status || "PENDING"}</p>
            <p>💰 Tổng tiền: {Number(order.totalAmount || 0).toLocaleString("vi-VN")} ₫</p>

            <hr />

            {/* ITEMS */}
            {order.items.map((item, index) => (
                <div
                    key={item.productId || index}
                    style={{
                        border: "1px solid #eee",
                        padding: 15,
                        marginBottom: 10,
                        borderRadius: 8
                    }}
                >
                    <p><b>{item.productName}</b></p>

                    <p>Số lượng: {item.quantity}</p>

                    <p>
                        Giá: {Number(item.price || 0).toLocaleString("vi-VN")} ₫
                    </p>

                    <p>
                        Thành tiền:{" "}
                        {Number(
                            (item.price || 0) * (item.quantity || 0)
                        ).toLocaleString("vi-VN")} ₫
                    </p>
                </div>
            ))}
        </div>
    );
}