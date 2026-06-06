import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Auth/Login";
import ProductList from "../pages/Product/ProductList";
import ProductDetail from "../pages/Product/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import OrderList from "../pages/Orders/OrderList";
import OrderDetail from "../pages/Orders/OrderDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= DEFAULT ================= */}
        <Route path="/" element={<Navigate to="/products" />} />

        {/* ================= AUTH ================= */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* ================= PRODUCTS (ALL + CATEGORY) ================= */}
        <Route
  path="/products"
  element={
    <MainLayout>
      <ProductList key="all" />
    </MainLayout>
  }
/>

       <Route
  path="/products/:category"
  element={
    <MainLayout>
      <ProductList key="category" />
    </MainLayout>
  }
/>

        {/* ================= PRODUCT DETAIL ================= */}
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />

        {/* ================= CART ================= */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        {/* ================= CHECKOUT ================= */}
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        {/* ================= ORDER SUCCESS ================= */}
        <Route
          path="/order-success/:orderId"
          element={
            <MainLayout>
              <OrderSuccess />
            </MainLayout>
          }
        />

        {/* ================= ORDERS ================= */}
        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrderList />
            </MainLayout>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <MainLayout>
              <OrderDetail />
            </MainLayout>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/products" />} />

      </Routes>
    </BrowserRouter>
  );
}