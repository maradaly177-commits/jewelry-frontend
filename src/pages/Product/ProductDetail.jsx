import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔥 LẤY PRODUCT
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

    // 🔥 ADD TO CART
    const handleAddToCart = async () => {
        try {
            await axios.post("https://localhost:7259/api/Cart/add", {
                userId: 1, // tạm thời hardcode
                productId: product.id, // 🔥 QUAN TRỌNG: dùng id (int)
                quantity: 1
            });

            alert(`Đã thêm "${product.productName}" vào giỏ hàng!`);
        } catch (error) {
            console.error("Lỗi thêm giỏ:", error);
            alert("Thêm giỏ hàng thất bại!");
        }
    };

    // 🔄 LOADING
    if (loading) return <div>Đang tải...</div>;

    // ❌ KHÔNG TÌM THẤY
    if (!product) return <div>Không tìm thấy sản phẩm!</div>;

    return (
        <div className="bvlgari-detail-container">
            <div className="luxury-grid-detail">

                {/* 🖼️ ẢNH */}
                <div className="product-image-large">
                    <img
                        src={`/images/${product.image}`}
                        alt={product.productName}
                        onError={(e) => {
                            e.target.src = '/images/default.jpg';
                        }}
                    />
                </div>

                {/* 📄 INFO */}
                <div className="product-info-detail">
                    <p className="category-label">Jewelry / Rings</p>

                    <h2>{product.productName}</h2>

                    <p className="product-price-detail">
                        {Number(product.price || 0).toLocaleString()} $
                    </p>

                    <p className="tax-note">Excluding Taxes</p>

                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    {/* 🔥 BUTTON */}
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