import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import ProductList from "./pages/Product/ProductList";
import Login from "./pages/Auth/Login";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/Product/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderList from "./pages/Orders/OrderList";
import OrderDetail from "./pages/Orders/OrderDetail";

function App() {
  return (
    <>
      {/* Toast global */}
      <ToastContainer />

      <BrowserRouter>
        <Routes>

          {/* ================= DEFAULT ================= */}
          <Route path="/" element={<Navigate to="/products" />} />

          {/* ================= LOGIN ================= */}
          <Route path="/login" element={<Login />} />

          {/* ================= PRODUCTS (ALL) ================= */}
         <Route
  path="/products"
  element={
    <MainLayout>
      <ProductList key="all" />
    </MainLayout>
  }
/>

          {/* ================= CATEGORY PRODUCTS ================= */}
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
              <MainLayout hideNavbar={true}>
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
    </>
  );
}

export default App;