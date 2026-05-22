import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Auth/Login";
import ProductList from "../pages/Product/ProductList";
import ProductDetail from "../pages/Product/ProductDetail"; // 👉 THÊM
import Cart from "../pages/Cart/Cart";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />

        

        {/* Main */}
        <Route path="/products" element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        } />

        {/* 👉 QUAN TRỌNG: TRANG CHI TIẾT */}
        <Route path="/product/:id" element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        } />

        {/* Cart */}
        <Route path="/cart" element={
          <MainLayout>
            <Cart />
          </MainLayout>
        } />

      </Routes>
    </BrowserRouter>
  );
}