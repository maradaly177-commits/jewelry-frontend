import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import ProductList from "./pages/Product/ProductList";
import Login from "./pages/Auth/Login"
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/Product/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Mặc định */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        

        {/* Product List */}
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        {/* 🔥 Product Detail (QUAN TRỌNG) */}
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/products" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;