import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../../assets/css/ProductList.css";

import ProductItem from "./ProductItem";

// =========================
// IMAGES
// =========================
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

import p16Image from "../../assets/images/watch1.webp";
import p17Image from "../../assets/images/watch2.webp";
import p18Image from "../../assets/images/watch3.jpg";
import p19Image from "../../assets/images/watch3.webp";
import p20Image from "../../assets/images/watch4.webp";
import p21Image from "../../assets/images/watch5.jpg";
import p22Image from "../../assets/images/watch5.webp";
import p23Image from "../../assets/images/watch6.jpg";
import p24Image from "../../assets/images/watch7.jpg";
import p25Image from "../../assets/images/watch8.webp";
import p26Image from "../../assets/images/watch9.jpg";
import p27Image from "../../assets/images/watch10.webp";
import p28Image from "../../assets/images/watch11.webp";
import p29Image from "../../assets/images/watch12.jpg";
import p30Image from "../../assets/images/watch13.jpg";
// =========================
// IMAGE MAP
// =========================
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
    "watch1.webp": p16Image,
    "watch2.webp": p17Image,
    "watch3.jpg": p18Image,
    "watch3.webp": p19Image,
    "watch4.webp": p20Image,
    "watch5.jpg": p21Image,
    "watch5.webp": p22Image,
    "watch6.jpg": p23Image,
    "watch7.jpg": p24Image,
    "watch8.webp": p25Image,
    "watch9.jpg": p26Image,
    "watch10.webp": p27Image,
    "watch11.webp": p28Image,
    "watch12.jpg": p29Image,
    "watch13.jpg": p30Image,



};

export default function ProductList() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    

    // =========================
    // STATE
    // =========================
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    const fallbackImages = [
        p1Image, p2Image, p3Image, p4Image, p5Image,
        p6Image, p7Image, p8Image, p9Image, p10Image,
        p11Image, p12Image, p13Image, p14Image, p15Image, p16Image, p17Image, p18Image, p19Image, p20Image, p21Image, p22Image, p23Image, p24Image, p25Image, p26Image, p27Image, p28Image, p29Image, p30Image
    ];

    // =========================
    // LOAD PRODUCTS
    // =========================
    useEffect(() => {

    const categoryKey = (category || "").trim().toLowerCase();

    let url = "https://localhost:7259/api/Product";

    if (categoryKey) {
        url = `https://localhost:7259/api/Product/filter?category=${categoryKey}`;
    }

    axios.get(url)
        .then(res => {
            console.log("API DATA:", res.data);

            const list = res.data?.data || [];

            setProducts(Array.isArray(list) ? list : []);
        })
        .catch(err => console.error(err));

}, [category]);

    // =========================
    // FILTER + SEARCH + SORT
    // =========================
     const filteredProducts = products
    .filter((p) => {

        const name = (
            p.productName ||
            p.ProductName ||
            p.name ||
            ""
        ).toString().toLowerCase();

        const price = Number(
            p.UnitPrice ?? p.unitPrice ?? p.Price ?? p.price ?? 0
        );

        const searchText = search.toLowerCase().trim();

        const matchSearch =
            searchText === "" || name.includes(searchText);

        const min = minPrice ? Number(minPrice) : null;
        const max = maxPrice ? Number(maxPrice) : null;

        const matchMin = min ? price >= min : true;
        const matchMax = max ? price <= max : true;

        return matchSearch && matchMin && matchMax;
    })
    .sort((a, b) => {

        const priceA = Number(a.UnitPrice ?? a.unitPrice ?? 0);
        const priceB = Number(b.UnitPrice ?? b.unitPrice ?? 0);

        if (sort === "asc") return priceA - priceB;
        if (sort === "desc") return priceB - priceA;

        return 0;
    });

    // =========================
    // ADD TO CART
    // =========================
    const addToCart = async (product) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.id || 1;

            await axios.post("https://localhost:7259/api/Cart/add", {
                userId,
                productId: product.id ?? product.Id,
                quantity: 1
            });

            alert(`Đã thêm "${product.productName ?? product.ProductName}" vào giỏ hàng!`);
        } catch (err) {
            console.error("ADD CART ERROR:", err);
            alert("Không thể thêm vào giỏ hàng.");
        }
    };

    // =========================
    // RENDER
    // =========================
    return (
        <div className="bvlgari-style">

            {/* ================= NAV ================= */}
            <nav className="main-nav">

                <div className="brand-center">

                    <h1
                        className="logo"
                        onClick={() => navigate("/")}
                    >
                        M V L D A R I
                    </h1>

                    {/* SEARCH */}
                    <input
                        className="nav-search"
                        type="text"
                        placeholder="Search jewelry..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* FILTER */}
                    <div className="filter-bar">

                        <input
                            className="filter-input"
                            placeholder="Min price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />

                        <input
                            className="filter-input"
                            placeholder="Max price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />

                        <select
                            className="filter-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Sort price</option>
                            <option value="asc">Giá tăng</option>
                            <option value="desc">Giá giảm</option>
                        </select>

                    </div>

                </div>

              <ul className="nav-menu">

    <li onClick={() => navigate("/products?category=jewelry")}>
        TRANG SỨC
    </li>

    <li onClick={() => navigate("/products?category=watch")}>
        ĐỒNG HỒ
    </li>

    <li onClick={() => navigate("/cart")}>
        GIỎ HÀNG
    </li>

</ul>

            </nav>

            {/* ================= HERO ================= */}
            <section className="video-hero">

                <div className="video-wrapper">
                    <video autoPlay loop muted playsInline className="bg-video">
                        <source src="https://media2.bulgari.com/video/upload/f_auto,q_auto/v1760090043/homepage/serpenti/magnificent-icons/JW-25_MI_Bzero1_BB_Serpenti_1920x1080.mp4" />
                    </video>
                </div>

                <div className="video-overlay">
                    <div className="overlay-content">
                        <h2 className="fade-in-text">
                            INFINITE TRANSFORMATIONS
                        </h2>

                        <button className="btn-explore">
                            BỘ SƯU TẬP MỚI
                        </button>
                    </div>
                </div>

            </section>

            {/* ================= PRODUCTS ================= */}
            <div className="product-listing">

                <div className="listing-header">
                    <h3>Trang Sức Biểu Tượng</h3>
                </div>

                <div className="luxury-grid">

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p, index) => (
                            <ProductItem
                                key={p.id ?? p.Id}
                                product={p}
                                index={index}
                                imageMap={imageMap}
                                fallbackImages={fallbackImages}
                                onAddToCart={addToCart}
                            />
                        ))
                    ) : (
                        <div className="loading-state">
                            Không tìm thấy sản phẩm
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}