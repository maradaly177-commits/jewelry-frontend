import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
    const { id } = useParams(); // Lấy ID từ URL (đúng cái mã Guid dài đó)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // GỌI API THEO ID TRỰC TIẾP
                // Đảm bảo URL này khớp với Endpoint API của bạn (ví dụ: .../api/Product/GUID)
                const res = await axios.get(
  `https://localhost:7259/api/Product/${id}`
);
                setProduct(res.data);
            } catch (error) {
                console.error("Không tìm thấy sản phẩm:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return <div>Đang tải chi tiết...</div>;
    if (!product) return <div>Sản phẩm không tồn tại!</div>;

    return (
        <div>
            <h2>{product.productName}</h2>
            <p>Giá: {product.price}</p>
            <p>{product.description}</p>
        </div>
    );
}