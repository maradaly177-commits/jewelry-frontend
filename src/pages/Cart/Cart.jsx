import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://localhost:7259/api/Cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Lỗi khi load giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (orderDetailId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`https://localhost:7259/api/Cart/remove/${orderDetailId}`);
      loadCart();
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item.Price || item.price || 0;
    const quantity = item.Quantity || item.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Đang tải...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "15px" }}>🛒 Giỏ hàng của bạn</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Giỏ hàng trống.</p>
          <a href="/products">Quay lại mua sắm</a>
        </div>
      ) : (
        <>
          <table width="100%" style={{ borderCollapse: "collapse", marginTop: "20px", backgroundColor: "#fff" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                <th style={{ padding: "15px" }}>Sản phẩm</th>
                <th style={{ padding: "15px" }}>Giá</th>
                <th style={{ padding: "15px" }}>Số lượng</th>
                <th style={{ padding: "15px" }}>Thành tiền</th>
                <th style={{ padding: "15px", textAlign: "center" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const currentId = item.Id || item.id;
                const name = item.ProductName || item.productName;
                const price = item.Price || item.price || 0;
                const quantity = item.Quantity || item.quantity || 0;
                
                // Lấy tên file ảnh (ví dụ: P1.jpg) từ database
                const imgName = item.Image || item.image;

                return (
                  <tr key={currentId || index} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "80px", height: "80px", marginRight: "15px", overflow: "hidden", borderRadius: "5px", border: "1px solid #f0f0f0" }}>
                          <img 
                            // SỬA Ở ĐÂY: Dùng require để React tìm ảnh trong src/assets/images
                            src={require(`../../assets/images/${imgName}`)} 
                            alt={name} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://via.placeholder.com/80?text=No+Image";
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: "500" }}>{name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>{price.toLocaleString("vi-VN")} đ</td>
                    <td style={{ padding: "15px" }}>{quantity}</td>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>{(price * quantity).toLocaleString("vi-VN")} đ</td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <button 
                        onClick={() => removeItem(currentId)}
                        style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "4px" }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <h3>Tổng thanh toán: <span style={{ color: "#e44d26", fontSize: "24px" }}>{total.toLocaleString("vi-VN")} đ</span></h3>
            <button style={{ padding: "12px 30px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "18px", fontWeight: "bold" }}>
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </>
      )}
    </div>
  );
}