import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProductList from "./pages/Product/ProductList";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>

        {/* Mặc định vào login */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Sau khi login */}
        <Route path="/products" element={<ProductList />} />

      </Routes>
    </Router>
  );
}

export default App;