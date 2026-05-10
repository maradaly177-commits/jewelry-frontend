import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/ProductList.css";

// 1. Import tất cả các ảnh thực tế bạn đang có
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

// 2. Tạo bảng ánh xạ (Mapping) để khớp tên file từ Database với biến Import
const imageMap = {
    "P1.jpg": p1Image,
    "P2.jpg": p2Image,
    "P7.jpg": p3Image,
    "P9.jpg": p4Image,
    "P10.jpg": p5Image,
    "P12.jpg": p6Image,
    "P8.jpg": p7Image,
    "P9.webp": p9Image,
    "p10.jpg": p10Image,
    "p11.webp": p11Image,
    "p12.jpg": p12Image,
    "p13.jpg": p13Image,
    "p14.jpg": p14Image,
    "p15.webp": p15Image
};

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API lấy danh sách sản phẩm
        axios.get("https://localhost:7259/api/Product") 
            .then(res => {
                console.log("Dữ liệu nhận được:", res.data);
                setProducts(res.data);
            })
            .catch(err => {
                console.error("Lỗi API:", err);
            });
    }, []);

    // Danh sách ảnh mặc định để dự phòng nếu Database để trống
    const fallbackImages = [p1Image, p2Image, p3Image, p4Image, p5Image, p6Image, p7Image, p8Image, p9Image, p10Image, p11Image, p12Image, p13Image, p14Image, p15Image];

    return (
        <div className="bvlgari-style">
            <nav className="main-nav">
                <div className="brand-center">
                    <h1 className="logo">M V L D A R I</h1>
                </div>
                <ul className="nav-menu">
                    <li>TRANG SỨC</li>
                    <li>ĐỒNG HỒ</li>
                    <li>PHỤ KIỆN</li>
                    <li>QUÀ TẶNG</li>
                </ul>
            </nav>

            <section className="video-hero">
                <div className="video-wrapper">
                    <video autoPlay loop muted playsInline className="bg-video">
                        <source src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1760090043/homepage/serpenti/magnificent-icons/JW-25_MI_Bzero1_BB_Serpenti_1920x1080.mp4" />
                    </video>
                </div>
                <div className="video-overlay">
                    <div className="overlay-content">
                        <h2 className="fade-in-text">INFINITE TRANSFORMATIONS</h2>
                        <button className="btn-explore">KHÁM PHÁ NGAY</button>
                    </div>
                </div>
            </section>

            <div className="product-listing">
                <div className="listing-header">
                    <h3>Bộ Sưu Tập Trang Sức Cao Cấp</h3>
                </div>
                
                <div className="luxury-grid">
                    {products.length > 0 ? products.map((p, index) => (
                        <div key={p.id || index} className="item-card">
                            <div className="item-img">
                                <img 
                                    src={
                                        // Kiểm tra: Nếu p.image có tên file và tên đó tồn tại trong imageMap
                                        p.image && imageMap[p.image] 
                                            ? imageMap[p.image] 
                                            : fallbackImages[index % fallbackImages.length]
                                    } 
                                    alt={p.productName} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = fallbackImages[index % fallbackImages.length];
                                    }}
                                />
                            </div>
                            <div className="item-info">
                                <h4>{p.productName}</h4>
                                <p className="item-price">
                                    {Number(p.price || 0).toLocaleString('vi-VN')} đ
                                </p>
                            </div>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>
                            Đang kết nối đến kho trang sức...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}