import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h1>🎉 Đặt hàng thành công!</h1>

            <p>Mã đơn hàng: <b>#{orderId}</b></p>

            <button
                onClick={() => navigate("/products")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    cursor: "pointer"
                }}
            >
                Tiếp tục mua sắm
            </button>
        </div>
    );
}