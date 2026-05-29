import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, imageMap, fallbackImages, index }) => {

    // =========================
    // SAFE ID
    // =========================
    const currentId = product?.productId || product?.id || product?.Id;

    // =========================
    // SAFE NAME
    // =========================
    const name = product?.productName || product?.ProductName || "Không tên";

    // =========================
    // SAFE PRICE (CHUẨN HOÁ)
    // =========================
    const priceRaw =
        product?.unitPrice ??
        product?.UnitPrice ??
        product?.price ??
        product?.Price ??
        0;

    const price = Number(priceRaw) || 0;

    // =========================
    // SAFE IMAGE
    // =========================
    const img =
        product?.image && imageMap[product.image]
            ? imageMap[product.image]
            : fallbackImages[index % fallbackImages.length];

    return (
        <div className="item-card">
            <Link
                to={`/product/${currentId}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block"
                }}
            >
                <div className="item-img">
                    <img
                        src={img}
                        alt={name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImages[0];
                        }}
                    />
                </div>

                <div className="item-info">
                    <h4>{name}</h4>

                    <p className="item-price">
                        {price.toLocaleString("vi-VN")} ₫
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProductItem;