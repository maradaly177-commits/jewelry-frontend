import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    const [ratingInput, setRatingInput] = useState(5);
    const [commentInput, setCommentInput] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // ================= PRODUCT =================
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `https://localhost:7259/api/Product/${id}`
                );

                setProduct(res.data);
            } catch (err) {
                console.error(err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // ================= REVIEW (FIX ESLINT) =================
    const fetchReviews = useCallback(async () => {
        try {
            const r1 = await axios.get(
                `https://localhost:7259/api/review/product/${id}`
            );

            const r2 = await axios.get(
                `https://localhost:7259/api/review/average/${id}`
            );

            setReviews(Array.isArray(r1.data) ? r1.data : []);
            setAvgRating(Number(r2.data) || 0);

        } catch (err) {
            console.error(err);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchReviews();
    }, [id, fetchReviews]);

    // ================= PRICE =================
    const price =
        product?.unitPrice ??
        product?.UnitPrice ??
        product?.price ??
        product?.Price ??
        0;

    // ================= ADD TO CART =================
    const handleAddToCart = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            await axios.post("https://localhost:7259/api/Cart/add", {
                userId: user?.id || 1,
                productId: product?.id || product?.Id,
                quantity: 1
            });

            navigate("/cart");

        } catch (err) {
            console.error(err);
            alert("Thêm giỏ hàng thất bại!");
        }
    };

    // ================= SUBMIT REVIEW =================
    const handleSubmitReview = async () => {
        try {
            setSubmitting(true);

            const user = JSON.parse(localStorage.getItem("user") || "{}");

            await axios.post("https://localhost:7259/api/review", {
                userId: user?.id || 1,
                productId: product?.id || product?.Id,
                rating: ratingInput,
                comment: commentInput
            });

            setCommentInput("");
            setRatingInput(5);

            await fetchReviews();

        } catch (err) {
            console.error(err);
            alert("Gửi đánh giá thất bại!");
        } finally {
            setSubmitting(false);
        }
    };

    // ================= STAR =================
    const renderStars = (value) => {
        const v = Math.max(0, Math.round(Number(value) || 0));
        return "⭐".repeat(v);
    };

    // ================= LOADING =================
    if (loading) return <div>Đang tải...</div>;
    if (!product?.id) return <div>Không tìm thấy sản phẩm!</div>;

    return (
        <div className="bvlgari-detail-container">

            <div className="luxury-grid-detail">

                <div className="product-image-large">
                    <img
                        src={product.image ? `/images/${product.image}` : "/images/default.jpg"}
                        alt={product.productName}
                    />
                </div>

                <div className="product-info-detail">

                    <p className="category-label">Jewelry / Rings</p>

                    <h2>{product.productName}</h2>

                    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <div style={{ color: "#ffb400" }}>
                            {renderStars(avgRating)}
                        </div>

                        <b>{Number(avgRating).toFixed(1)}</b>

                        <span>({reviews.length} đánh giá)</span>
                    </div>

                    <h3 style={{ color: "red" }}>
                        {Number(price).toLocaleString("vi-VN")} ₫
                    </h3>

                    <p style={{ lineHeight: 1.6 }}>
                        {product.description}
                    </p>

                    <div style={{ marginTop: 25 }}>

                        <button
                            onClick={handleAddToCart}
                            style={{
                                width: "100%",
                                padding: 16,
                                background: "#000",
                                color: "#fff",
                                border: "none",
                                marginBottom: 10,
                                cursor: "pointer"
                            }}
                        >
                            ADD TO SHOPPING BAG
                        </button>

                        <button
                            style={{
                                width: "100%",
                                padding: 16,
                                border: "1px solid #000",
                                background: "transparent",
                                cursor: "pointer",
                                marginBottom: 10
                            }}
                        >
                            SEND AS A GIFT
                        </button>

                        {/* CONTACT */}
                        <div style={{ fontSize: 14, color: "#555", marginTop: 10 }}>
                            <p style={{ cursor: "pointer" }}>👤 Contact us</p>
                            <p style={{ cursor: "pointer" }}>📍 Find in store</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEW FORM */}
            <div style={{
                marginTop: 40,
                padding: 20,
                border: "1px solid #eee",
                borderRadius: 12
            }}>
                <h3>✍ Viết đánh giá</h3>

                <div style={{ margin: "10px 0" }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={star}
                            onClick={() => setRatingInput(star)}
                            style={{
                                fontSize: 22,
                                cursor: "pointer",
                                color: star <= ratingInput ? "#ffb400" : "#ccc"
                            }}
                        >
                            ⭐
                        </span>
                    ))}
                </div>

                <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Nhập đánh giá..."
                    style={{
                        width: "100%",
                        minHeight: 80,
                        padding: 10,
                        border: "1px solid #ddd",
                        borderRadius: 6
                    }}
                />

                <button
                    onClick={handleSubmitReview}
                    disabled={submitting}
                    style={{
                        marginTop: 10,
                        padding: "10px 20px",
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
            </div>

            {/* REVIEW LIST */}
            <div style={{
                marginTop: 40,
                padding: 20,
                border: "1px solid #eee",
                borderRadius: 12
            }}>
                <h3>⭐ Đánh giá sản phẩm</h3>

                {reviews.length === 0 ? (
                    <p>Chưa có đánh giá nào</p>
                ) : (
                    reviews.map((r, index) => (
                        <div key={r.id || index} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                            <b>{r.userName || `User ${r.userId}`}</b>
                            <div style={{ color: "#ffb400" }}>
                                {renderStars(r.rating)}
                            </div>
                            <p>{r.comment}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}