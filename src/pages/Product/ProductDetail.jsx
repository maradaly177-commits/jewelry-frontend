import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Gọi API lấy chi tiết sản phẩm dựa trên ID từ Database
    axios.get(`https://localhost:7259/api/Products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Đang tải...</div>;

  return (
    <div style={{ display: "flex", padding: "40px", gap: "20px" }}>
      <img 
        // Sử dụng require để lấy ảnh từ thư mục src/assets/images
        src={require(`../../assets/images/${product.Image || product.image}`)} 
        alt={product.ProductName} 
        style={{ width: "400px" }} 
      />
      <div>
        <h1>{product.ProductName}</h1>
        <p>Giá: {product.Price?.toLocaleString()} đ</p>
        <p>{product.Description}</p>
        <button>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}