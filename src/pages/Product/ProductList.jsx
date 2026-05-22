import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Thêm Link để điều hướng chi tiết
import "../../assets/css/ProductList.css";

// ... (giữ nguyên các phần import ảnh và imageMap bên trên)
import ProductItem from "./ProductItem"; // Import component vừa tạo

// 1. Import ảnh thực tế từ thư mục src/assets/images
import p1Image from "../../assets/images/P1.jpg";
import p2Image from "../../assets/images/P2.jpg";
import p3Image from "../../assets/images/P7.jpg";
import p4Image from "../../assets/images/P9.jpg";
import p5Image from "../../assets/images/P10.jpg";
import p6Image from "../../assets/images/P12.jpg";
import p7Image from "../../assets/images/P8.jpg";
import p8Image from "../../assets/images/P15.webp";
import p9Image from "../../assets/images/OIP.webp";
import p10Image from "../../assets/images/P16.jpg";
import p11Image from "../../assets/images/P17.webp";
import p12Image from "../../assets/images/P18.jpg";
import p13Image from "../../assets/images/P19.jpg";
import p14Image from "../../assets/images/P20.jpg";
import p15Image from "../../assets/images/P21.webp";

// 2. Mapping ảnh (Khớp với cột Image trong Database)
const imageMap = {
    "P1.jpg": p1Image,
    "P2.jpg": p2Image,
    "P7.jpg": p3Image,
    "P9.jpg": p4Image,
    "P10.jpg": p5Image,
    "P12.jpg": p6Image,
    "P8.jpg": p7Image,
    "P15.webp": p8Image,
    "OIP.webp": p9Image,
    "P16.jpg": p10Image,
    "P17.webp": p11Image,
    "P18.jpg": p12Image,
    "P19.jpg": p13Image,
    "P20.jpg": p14Image,
    "P21.webp": p15Image
};

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:7259/api/Product")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Lỗi lấy sản phẩm:", err));
    }, []);

    const addToCart = async (product) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = userData.id || 1;

            const cartData = {
                UserId: userId,
                ProductId: product.id || product.Id,
                Quantity: 1
            };

            await axios.post("https://localhost:7259/api/Cart/add", cartData);
            alert(`Đã thêm "${product.productName}" thành công!`);
        } catch (err) {
            console.error("Lỗi thêm vào giỏ:", err);
            alert("Không thể thêm vào giỏ hàng.");
        }
    };

    const fallbackImages = [p1Image, p2Image, p3Image, p4Image, p5Image, p6Image, p7Image, p8Image, p9Image, p10Image, p11Image, p12Image, p13Image, p14Image, p15Image];

    return (
        <div className="bvlgari-style">
            {/* Navigation Bar */}
            <nav className="main-nav">
                <div className="brand-center">
                    <h1 className="logo" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
                        M V L D A R I
                    </h1>
                </div>
                <ul className="nav-menu">
                    <li>TRANG SỨC</li>
                    <li>ĐỒNG HỒ</li>
                    <li onClick={() => navigate("/cart")} style={{fontWeight: 'bold', color: '#b68d40', cursor: 'pointer'}}>
                        GIỎ HÀNG
                    </li>
                </ul>
            </nav>

            {/* Hero Video Section */}
            <section className="video-hero">
                <div className="video-wrapper">
                    <video autoPlay loop muted playsInline className="bg-video">
                        <source src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1760090043/homepage/serpenti/magnificent-icons/JW-25_MI_Bzero1_BB_Serpenti_1920x1080.mp4" />
                    </video>
                </div>
                <div className="video-overlay">
                    <div className="overlay-content">
                        <h2 className="fade-in-text">INFINITE TRANSFORMATIONS</h2>
                        <button className="btn-explore">BỘ SƯU TẬP MỚI</button>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <div className="product-listing">
                <div className="listing-header">
                    <h3>Trang Sức Biểu Tượng</h3>
                </div>
                
                <div className="luxury-grid">
                    {products.length > 0 ? (
                        products.map((p, index) => (
                            <ProductItem 
                                key={p.productId}
                                product={p}
                                index={index}
                                imageMap={imageMap}
                                fallbackImages={fallbackImages}
                                onAddToCart={addToCart}
                            />
                        ))
                    ) : (
                        <div className="loading-state">Đang tải tuyệt tác trang sức...</div>
                    )}
                </div>
            </div>
        </div>
    );
}