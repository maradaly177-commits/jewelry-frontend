import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================
    // LOAD PRODUCT
    // =========================
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `https://localhost:7259/api/Product/${id}`
                );

                setProduct(res.data);
            } catch (error) {
                console.error("Lỗi load product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // =========================
    // SAFE PRICE (FIX 0$)
    // =========================
    const price =
        product?.unitPrice ??
        product?.UnitPrice ??
        product?.price ??
        product?.Price ??
        0;

    // =========================
    // ADD TO CART
    // =========================
    const handleAddToCart = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            await axios.post("https://localhost:7259/api/Cart/add", {
                userId: user?.id || 1,
                productId: product?.id || product?.Id,
                quantity: 1
            });

            navigate("/cart");

        } catch (error) {
            console.error("Lỗi thêm giỏ:", error);
            alert("Thêm giỏ hàng thất bại!");
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) return <div>Đang tải...</div>;
    if (!product) return <div>Không tìm thấy sản phẩm!</div>;

    return (
        <div className="bvlgari-detail-container">
            <div className="luxury-grid-detail">

                {/* IMAGE */}
                <div className="product-image-large">
                    <img
                        src={
                            product.image
                                ? `/images/${product.image}`
                                : "/images/default.jpg"
                        }
                        alt={product.productName}
                        onError={(e) => {
                            e.target.src = "/images/default.jpg";
                        }}
                    />
                </div>

                {/* INFO */}
                <div className="product-info-detail">
                    <p className="category-label">Jewelry / Rings</p>

                    <h2>{product.productName}</h2>

                    {/* FIX PRICE */}
                    <p className="product-price-detail">
                        {Number(price).toLocaleString("vi-VN")} ₫
                    </p>

                    <p className="tax-note">Excluding Taxes</p>

                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    {/* BUTTON */}
                    <div className="action-area" style={{ margin: '30px 0' }}>
                        <button
                            className="btn-add-to-bag"
                            onClick={handleAddToCart}
                        >
                            ADD TO SHOPPING BAG
                        </button>

                        <button
                            style={{
                                width: '100%',
                                padding: '18px',
                                marginTop: '10px',
                                background: 'transparent',
                                border: '1px solid #000',
                                cursor: 'pointer'
                            }}
                        >
                            SEND AS A GIFT
                        </button>
                    </div>

                    {/* SUPPORT */}
                    <div className="support-links">
                        <p style={{ cursor: 'pointer' }}>👤 Contact us</p>
                        <p style={{ cursor: 'pointer' }}>📍 Find in store</p>
                    </div>
                </div>
            </div>
        </div>
    );
}