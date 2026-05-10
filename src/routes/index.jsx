import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductList from "../pages/Product/ProductList";
import Cart from "../pages/Cart/Cart";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate to="/register" />} />
        {/* Auth */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />

        <Route path="/register" element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        } />

        {/* Main */}
        <Route path="/products" element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        } />

        <Route path="/cart" element={
  <MainLayout>
    <Cart />
  </MainLayout>
} />

      </Routes>
    </BrowserRouter>
  );
}