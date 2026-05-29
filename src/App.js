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

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Products */}
          <Route
            path="/products"
            element={
              <MainLayout>
                <ProductList />
              </MainLayout>
            }
          />

          {/* Product Detail */}
          <Route
            path="/product/:id"
            element={
              <MainLayout hideNavbar={true}>
                <ProductDetail />
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

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <Checkout />
              </MainLayout>
            }
          />

          {/* Order Success */}
          <Route
            path="/order-success/:orderId"
            element={
              <MainLayout>
                <OrderSuccess />
              </MainLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/products" />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;