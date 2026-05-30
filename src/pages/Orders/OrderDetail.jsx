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

                setItems(res.data || []);
            } catch (err) {
                console.error(err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div style={{ padding: 20 }}>
                ⏳ Đang tải đơn hàng...
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ padding: 20 }}>
                <h2>📦 Chi tiết đơn hàng #{id}</h2>

                <p>Không có sản phẩm trong đơn hàng</p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    const subtotal = items.reduce(
        (sum, item) =>
            sum +
            (item.price || 0) *
                (item.quantity || 0),
        0
    );

    const shippingFee = 30000;

    const total =
        subtotal + shippingFee;

    return (
        <div
            style={{
                maxWidth: 900,
                margin: "30px auto",
                padding: 20
            }}
        >
            <h2
                style={{
                    marginBottom: 25
                }}
            >
                📦 Chi tiết đơn hàng #{id}
            </h2>

            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        gap: 20,
                        border: "1px solid #eee",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 15,
                        background: "#fff",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                >
                    <img
                        src={
                            item.image
                                ? `/images/${item.image}`
                                : "https://via.placeholder.com/120"
                        }
                        alt={
                            item.productName
                        }
                        style={{
                            width: 120,
                            height: 120,
                            objectFit:
                                "cover",
                            borderRadius: 8
                        }}
                    />

                    <div
                        style={{
                            flex: 1
                        }}
                    >
                        <h4
                            style={{
                                marginTop: 0
                            }}
                        >
                            {
                                item.productName
                            }
                        </h4>

                        <p>
                            🛍 Số lượng:{" "}
                            <b>
                                {
                                    item.quantity
                                }
                            </b>
                        </p>

                        <p>
                            💵 Đơn giá:{" "}
                            <b>
                                {Number(
                                    item.price
                                ).toLocaleString(
                                    "vi-VN"
                                )}
                                ₫
                            </b>
                        </p>

                        <p>
                            💰 Thành tiền:{" "}
                            <b>
                                {Number(
                                    item.price *
                                        item.quantity
                                ).toLocaleString(
                                    "vi-VN"
                                )}
                                ₫
                            </b>
                        </p>
                    </div>
                </div>
            ))}

            <div
                style={{
                    borderTop:
                        "2px solid #eee",
                    marginTop: 20,
                    paddingTop: 20,
                    textAlign: "right"
                }}
            >
                <p>
                    Tạm tính:
                    <b>
                        {" "}
                        {subtotal.toLocaleString(
                            "vi-VN"
                        )}
                        ₫
                    </b>
                </p>

                <p>
                    Phí vận chuyển:
                    <b>
                        {" "}
                        {shippingFee.toLocaleString(
                            "vi-VN"
                        )}
                        ₫
                    </b>
                </p>

                <h2>
                    Tổng cộng:
                    <span
                        style={{
                            marginLeft: 10,
                            color:
                                "#e53935"
                        }}
                    >
                        {total.toLocaleString(
                            "vi-VN"
                        )}
                        ₫
                    </span>
                </h2>
            </div>

            <button
                onClick={() =>
                    navigate("/orders")
                }
                style={{
                    marginTop: 20,
                    padding:
                        "10px 20px",
                    border: "none",
                    background:
                        "#000",
                    color: "#fff",
                    borderRadius: 8,
                    cursor: "pointer"
                }}
            >
                Quay lại đơn hàng
            </button>
        </div>
    );
}