import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, imageMap, fallbackImages, index }) => {
    // Lấy chính xác productId (Guid) từ object product nhận được từ API
    const currentId = product.productId;

    return (
        <div className="item-card">
            <Link
                // Dùng currentId để tạo đường dẫn chính xác: /product/f64186de-...
                to={`/product/${currentId}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
                <div className="item-img">
                    <img
                        src={product.image && imageMap[product.image]
                            ? imageMap[product.image]
                            : fallbackImages[index % fallbackImages.length]}
                        alt={product.productName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImages[0];
                        }}
                    />
                </div>
                <div className="item-info">
                    <h4>{product.productName}</h4>
                    <p className="item-price">
                        {Number(product.price || 0).toLocaleString('vi-VN')} ₫
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProductItem;